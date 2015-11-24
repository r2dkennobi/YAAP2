import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = 'http://localhost:3000';
const receiptsUrl = serverUrl + '/api/0/receipts';
const usersUrl = serverUrl + '/api/0/users';

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

export function loginUser(user) {
    return dispatch => {
        dispatch(loginUserRequest(user));

        return request
            .post(usersUrl)
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(loginUserFailure(err, user));
                } else {
                    dispatch(loginUserSuccess(res.body));
                }
            });
    }
}

export function loginUserRequest(user) {
    return {
        type: types.USER_LOGIN_REQUEST,
        user
    };
}

export function loginUserSuccess(user) {
    return {
        type: types.USER_LOGIN_SUCCESS,
        user
    };
}

export function loginUserFailure(error, user) {
    return {
        type: types.USER_LOGIN_FAILURE,
        error
    };
}

export function logoutUser(user) {
    return {
        type: types.USER_LOGOUT_SUCCESS,
        user
    };
}

export function createUser(user) {
    return dispatch => {
        dispatch(createUserRequest(user));

        return request
            .post(usersUrl + "/create")
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(createUserFailure(err, user));
                } else {
                    dispatch(createUserSuccess(res.body));
                }
            });
    }
}

export function createUserRequest(user) {
    return {
        type: types.CREATE_USER_REQUEST,
        user
    };
}

export function createUserSuccess(users) {
    return {
        type: types.CREATE_USER_SUCCESS,
        users
    };
}

export function createUserFailure(error, user) {
    return {
        type: types.CREATE_USER_FAILURE,
        error
    };
}

export function editUser(user) {
    return dispatch => {
        dispatch(editUserRequest(user));

        return request
            .post(usersUrl + '/' + user.id)
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(editUserFailure(err, user));
                } else {
                    dispatch(editUserSuccess(res.body));
                }
            });
    }
}

export function editUserRequest(user) {
    return {
        type: types.EDIT_USER_REQUEST,
        user
    };
}

export function editUserSuccess(users) {
    return {
        type: types.EDIT_USER_SUCCESS,
        users
    };
}

export function editUserFailure(error, user) {
    return {
        type: types.EDIT_USER_FAILURE,
        error
    };
}

export function deleteUser(user) {
    return dispatch => {
        dispatch(deleteUserRequest(user));

        return request
            .del(usersUrl + '/' + user.id)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(deleteUserFailure(err, user));
                } else {
                    dispatch(deleteUserSuccess(res.body));
                }
            });
    }
}

export function deleteUserRequest(user) {
    return {
        type: types.DELETE_USER_REQUEST,
        user
    };
}

export function deleteUserSuccess(user) {
    return {
        type: types.DELETE_USER_SUCCESS,
        users
    };
}

export function deleteUserFailure(error, user) {
    return {
        type: types.DELETE_USER_FAILURE,
        error
    };
}
