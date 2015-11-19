import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = 'http://localhost:3000';
const receiptsUrl = serverUrl + '/api/0/receipts';
const usersUrl = serverUrl + '/api/0/users';

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
        receipt,
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

export function userCreate(user) {
    return dispatch => {
        dispatch(userCreateRequest(user));

        return request
            .post(usersUrl)
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(userCreateFailure(err, user));
                } else {
                    dispatch(userCreateSuccess(res.body));
                }
            });
    }
}

export function userCreateRequest(user) {
    return {
        type: types.USER_CREATE_REQUEST,
        user
    };
}

export function userCreateSuccess(users) {
    return {
        type: types.USER_CREATE_SUCCESS,
        users
    };
}

export function userCreateFailure(error, user) {
    return {
        type: types.USER_CREATE_FAILURE,
        error
    };
}

export function userEdit(user) {
    return dispatch => {
        dispatch(userEditRequest(user));

        return request
            .post(usersUrl + '/' + user.id)
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(userEditFailure(err, user));
                } else {
                    dispatch(userEditSuccess(res.body));
                }
            });
    }
}

export function userEditRequest(user) {
    return {
        type: types.USER_EDIT_REQUEST,
        user
    };
}

export function userEditSuccess(users) {
    return {
        type: types.USER_EDIT_SUCCESS,
        users
    };
}

export function userEditFailure(error, user) {
    return {
        type: types.USER_EDIT_FAILURE,
        error
    };
}

export function userDelete(user) {
    return dispatch => {
        dispatch(userDeleteRequest(user));

        return request
            .del(usersUrl + '/' + user.id)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(userDeleteFailure(err, user));
                } else {
                    dispatch(userDeleteSuccess(res.body));
                }
            });
    }
}

export function userDeleteRequest(user) {
    return {
        type: types.USER_DELETE_REQUEST,
        user
    };
}

export function userDeleteSuccess(user) {
    return {
        type: types.USER_DELETE_SUCCESS,
        users
    };
}

export function userDeleteFailure(error, user) {
    return {
        type: types.USER_DELETE_FAILURE,
        error
    };
}

export function userLogin(user) {
    return dispatch => {
        dispatch(userLoginRequest(user));

        return request
            .post(usersUrl)
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(userLoginFailure(err, user));
                } else {
                    dispatch(userLoginSuccess(res.body));
                }
            });
    }
}

export function userLoginRequest(user) {
    return {
        type: types.USER_LOGIN_REQUEST,
        user
    };
}

export function userLoginSuccess(user) {
    return {
        type: types.USER_LOGIN_SUCCESS,
        user
    };
}

export function userLoginFailure(error, user) {
    return {
        type: types.USER_LOGIN_FAILURE,
        error
    };
}

export function userLogout(user) {
    return dispatch => {
        dispatch(userLogoutRequest(user));

        return request
            .post(usersUrl)
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(userLogoutFailure(err, user));
                } else {
                    dispatch(userLogoutSuccess(res.body));
                }
            });
    }
}

export function userLogoutRequest(user) {
    return {
        type: types.USER_LOGOUT_REQUEST,
        user
    };
}

export function userLogoutSuccess(user) {
    return {
        type: types.USER_LOGOUT_SUCCESS,
        user
    };
}

export function userLogoutFailure(error, user) {
    return {
        type: types.USER_LOGOUT_FAILURE,
        error,
        user
    };
}
