import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = 'http://localhost:3000';
const usersUrl = serverUrl + '/api/0/users';

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
