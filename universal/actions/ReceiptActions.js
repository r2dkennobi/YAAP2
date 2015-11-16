import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = 'http://localhost:3000';
const receiptsUrl = serverUrl + '/api/0/receipts';

export function setUserId(userId) {
    return {
        type: types.SET_USER_ID,
        userId
    }
}

export function addReceipt(receipt) {
    return dispatch => {
        dispatch(addReceiptRequest(receipt));

        return request
            .post(receiptsUrl)
            .send(receipt)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(addReceiptFailure(err, receipt));
                } else {
                    dispatch(addReceiptSuccess(res.body));
                }
            });
    }
}

export function addReceiptRequest(receipt) {
    return {
        type: types.ADD_RECEIPT_REQUEST,
        receipt
    };
}

export function addReceiptSuccess(receipt) {
    return {
        type: types.ADD_RECEIPT_SUCCESS,
        receipt
    };
}

export function addReceiptFailure(error, receipt) {
    return {
        type: types.ADD_RECEIPT_FAILURE,
        error
    };
}

export function editReceipt(receipt) {
    return dispatch => {
        dispatch(editReceiptRequest(receipt));

        return request
            .post(receiptsUrl + '/' + receipt.id)
            .send(receipt)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(editReceiptFailure(err, receipt));
                } else {
                    dispatch(editReceiptSuccess(res.body));
                }
            });
    }
}

export function editReceiptRequest(receipt) {
    return {
        type: types.EDIT_RECEIPT_REQUEST,
        receipt
    };
}

export function editReceiptSuccess(receipt) {
    return {
        type: types.EDIT_RECEIPT_SUCCESS,
        receipt
    };
}

export function editReceiptFailure(error, receipt) {
    return {
        type: types.EDIT_RECEIPT_FAILURE,
        error,
        receipt
    };
}

export function deleteReceipt(receipt) {
    return dispatch => {
        dispatch(deleteReceiptRequest(receipt));

        return request
            .del(receiptsUrl + '/' + receipt.id)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(deleteReceiptFailure(err, receipt));
                } else {
                    dispatch(deleteReceiptSuccess(res.body));
                }
            });
    }
}

export function deleteReceiptRequest(receipt) {
    return {
        type: types.DELETE_RECEIPT_REQUEST,
        receipt
    };
}

export function deleteReceiptSuccess(receipt) {
    return {
        type: types.DELETE_RECEIPT_SUCCESS,
        receipt
    };
}

export function deleteReceiptFailure(error, receipt) {
    return {
        type: types.DELETE_RECEIPT_FAILURE,
        error,
        receipt
    };
}
