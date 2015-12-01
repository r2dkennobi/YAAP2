import r from 'rethinkdb';
import config from './server/api/config.json';
import crypto from 'crypto';
import uuid from 'node-uuid';

let DATABASE = config.db || 'yaap2';
let TABLES = [['users', 'userName'], ['receipts', 'id']];

r.connect(config)
.then(conn => {
    console.log('[>] Database Setup');
    return createDbIfNotExists(conn)
    .then(() => Promise.all(TABLES.map((table) => createTableIfNotExists(conn, table))))
    .then(() => Promise.all([setupAdminUser(conn)]))
    .then(() => closeConnection(conn));
});

function createDbIfNotExists(conn) {
    return getDbList(conn)
    .then((list) => {
        if (list.indexOf(DATABASE) === -1) {
            return createDatabase(conn);
        } else {
            console.log('[!] Database already exists:', DATABASE);
            return Promise.resolve(true);
        }
    });
}

function createTableIfNotExists(conn, tableConfig) {
    var table = tableConfig[0];
    var key = tableConfig[1];
    return getTableList(conn)
    .then((list) => {
        if (list.indexOf(table) === -1) {
            return createTable(conn, table, key);
        } else {
            console.log('[!] Table already exists:', table);
            return Promise.resolve(true);
        }
    });
}

function setupAdminUser(conn) {
    return createAdminUser(conn)
    .then((err, cursor) => {
        if (err.errors) {
            console.log('[!] Admin User exists');
        }
        return Promise.resolve(true);
    });
}

function getDbList(conn) {
    return r.dbList().run(conn);
}

function getTableList(conn) {
    return r.db(DATABASE).tableList().run(conn);
}

function createDatabase(conn) {
    console.log('[>] Creating database: ', DATABASE);
    return r.dbCreate(DATABASE).run(conn);
}

function createTable(conn, table, key) {
    console.log('[>] Creating table: ', table);
    return r.db(DATABASE).tableCreate(table, {primaryKey: key}).run(conn);
}

function createAdminUser(conn) {
    console.log('[>] Creating admin account');
    var hash = crypto.createHmac('sha512', 'admin');
    hash.setEncoding('base64');
    hash.write('admin');
    hash.end();
    var user = new Object();
    user.userName = 'admin';
    user.userRealName = 'admin';
    user.userEmail = 'admin';
    user.userRole = 'Admin';
    user.password = hash.read();
    user.created = new Date();
    user.userId = uuid.v1();
    return r.db(DATABASE).table('users').insert(user).run(conn);
}

function closeConnection(conn) {
    console.log('[>] Closing connection...');
    return conn.close();
}
