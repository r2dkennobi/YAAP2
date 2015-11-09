import r from 'rethinkdb';
import config from '../config.json';
import xss from 'xss';

function connect() {
    return r.connect(config);
}

export function getUsers() {
    return connect()
    .then(conn => {
        return r
        .table('users')
        .orderBy('name').run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function addUsers(user) {
}

export function editUser(user) {
}

export function deleteUser(id) {
}
