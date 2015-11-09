import * as receiptService from './service/receipts';

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
