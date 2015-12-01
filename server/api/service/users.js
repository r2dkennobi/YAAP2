import r from 'rethinkdb';
import config from '../config.json';
import xss from 'xss';
import crypto from 'crypto';
import uuid from 'node-uuid';

function connect() {
    return r.connect(config);
}

export function getUsers() {
    return connect()
    .then(conn => {
        return r
        .table('users')
        .run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function loginUser(userName, password) {
    var hash = crypto.createHmac('sha512', password);
    hash.setEncoding('base64');
    hash.write(userName);
    hash.end();
    var hashed = hash.read();
    return connect()
    .then(conn => {
        return r
        .table('users')
        .filter(r.row("userName").eq(userName).and(r.row("password").eq(hashed)))
        .run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function createUser(user) {
    var hash = crypto.createHmac('sha512', user.password);
    hash.setEncoding('base64');
    hash.write(user.userName);
    hash.end();
    user.password = hash.read();
    return connect()
    .then(conn => {
        user.created = new Date();
        user.userId = uuid.v1();
        return r
        .table('users')
        .insert(user).run(conn)
        .then(response => {
            return Object.assign({}, user, {id: response.generated_keys[0]});
        });
    });
}

export function editUser(id, user) {
    return connect()
    .then(conn => {
        return r
        .table('users')
        .get(id).update(user).run(conn)
        .then(() => user);
    });
}

export function deleteUser(id) {
    return connect()
    .then(conn => {
        return r
        .table('users')
        .get(id).delete().run(conn)
        .then(() => ({id: id, deleted: true}));
    });
}
