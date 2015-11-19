import * as receiptService from './service/receipts';
import * as userService from './service/users';

export function getReceipts(req, res) {
    receiptService.getReceipts()
        .then((receipts) => res.json(receipts))
        .catch(err => {
            res.status(400);
            res.json({error: err});
        });
}

export function addReceipt(req, res) {
    receiptService.addReceipt(req.body)
        .then((receipt) => res.json(receipt))
        .catch(err => {
            res.status(400);
            res.json({error: err, receipt: req.body});
        });
}

export function editReceipt(req, res) {
    receiptService.editReceipt(req.params.id, req.body)
        .then((receipt) => res.json(receipt))
        .catch(err => {
            res.status(400);
            res.json({error: err, receipt: req.body});
        });
}

export function deleteReceipt(req, res) {
    receiptService.deleteReceipt(req.params.id)
        .then((receipt) => res.json(receipt))
        .catch(err => {
            res.status(400);
            res.json({error: err, receipt: req.body});
        });
}

export function getUser(req, res) {
    userService.getUser()
        .then((user) => res.json(user))
        .catch(err => {
            res.status(400);
            res.json({error: err});
        });
}

export function addUser(req, res) {
    userService.addUser(req.body)
        .then((user) => res.json(user))
        .catch(err => {
            res.status(400);
            res.json({error: err, user: req.body});
        });
}

export function editUser(req, res) {
    userService.editUser(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => {
            res.status(400);
            res.json({error: err, user: req.body});
        });
}

export function deleteUser(req, res) {
    userService.deleteUser(req.params.id)
        .then((user) => res.json(user))
        .catch(err => {
            res.status(400);
            res.json({error: err, user: req.body});
        });
}
