import r from 'rethinkdb';
import config from '../config.json';
import xss from 'xss';

function connect() {
    return r.connect(config);
}

export function getUser() {
    return connect()
    .then(conn => {
        return r
        .table('users')
        .orderBy('name').run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function addUser(user) {
    return connect()
    .then(conn => {
        receipt.created = new Date();
        receipt.updated = new Date();
        return r
        .table('users')
        .insert(user).run(conn)
        .then(response => {
            return Object.assign({}, user, {id: response.generated_keys[0]});
        });
    });
}

export function editUser(id, user) {
    receipt.updated = new Date();
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
