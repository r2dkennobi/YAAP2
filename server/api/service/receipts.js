import r from 'rethinkdb';
import config from '../config.json';
import xss from 'xss';

function connect() {
    return r.connect(config);
}

export function liveUpdates(io) {
    console.log('Setting up receipt listener...');
    connect()
    .then(conn => {
        r
        .table('receipts')
        .changes().run(conn, (err, cursor) => {
            console.log('Listening for receipt changes...');
            cursor.each((err, change) => {
                console.log('Changes to receipts detected', change);
                io.emit('receipt-change', change);
            });
        });
    });
}

export function getReceipts() {
    return connect()
    .then(conn => {
        return r
        .table('receipts')
        .orderBy('updated').run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function getReceiptsForUser(user) {
    return connect()
    .then(conn => {
        return r
        .table('receipts')
        .getAll(user, {index: "name"}).run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function getReceiptsForGroup(group) {
    return connect()
    .then(conn => {
        return r
        .table('receipts')
        .getAll(group, {index: "group"}).run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function getReceiptDetail(id) {
    return connect()
    .then(conn => {
        return r
        .table('receipts')
        .get(id).run(conn)
        .then(cursor => cursor.toArray());
    });
}

export function addReceipt(receipt) {
    return connect()
    .then(conn => {
        receipt.created = new Date();
        receipt.updated = new Date();
        receipt.desc = xss(receipt.desc);
        return r
        .table('receipts')
        .insert(receipt).run(conn)
        .then(response => {
            return Object.assign({}, receipt, {id: response.generated_keys[0]});
        });
    });
}

export function editReceipt(id, receipt) {
    receipt.updated = new Date();
    receipt.desc = xss(receipt.desc);
    return connect()
    .then(conn => {
        return r
        .table('receipts')
        .get(id).update(receipt).run(conn)
        .then(() => receipt);
    });
}

export function deleteReceipt(id) {
    return connect()
    .then(conn => {
        return r
        .table('receipts')
        .get(id).delete().run(conn)
        .then(() => ({id: id, deleted: true}));
    });
}
