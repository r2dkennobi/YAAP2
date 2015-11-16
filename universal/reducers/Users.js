import {
    USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAILURE,
    USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILURE,
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
    USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
    userName: null,
    userUuid: null,
    isApproved: false,
    error: null
};

export default function receipts(state = initialState, action) {
    switch (action.type) {
        case USER_CREATE_REQUEST:
        case USER_EDIT_REQUEST:
        case USER_LOGIN_REQUEST:
        case USER_LOGOUT_REQUEST:
            return Object.assign({}, state, {
                error: null
            });
        case USER_CREATE_SUCCESS:
            return Object.assign({}, state, {
                userName: null,
                userUuid: null,
                isApproved: false,
                error: null,
            });
        case USER_EDIT_SUCCESS:
            return Object.assign({}, state, {
                userName: action.userName,
                userUuid: action.userUuid,
                isApproved: true,
                error: null,
            });
        case USER_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                userName: action.userName,
                userUuid: action.userUuid,
                isApproved: true,
                error: null;
            });
        case USER_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                userName: null,
                userUuid: null,
                isApproved: false,
                error: null;
            });
        case USER_CREATE_FAILURE:
        case USER_EDIT_FAILURE:
        case USER_LOGIN_FAILURE:
        case USER_LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isApproved: false,
                error: action.error,
            });
        default:
            return state;
    }
}
