import {
    LOAD_RECEIPTS_REQUEST, LOAD_RECEIPTS_SUCCESS, LOAD_RECEIPTS_FAILURE,
    ADD_RECEIPT_REQUEST, ADD_RECEIPT_SUCCESS, ADD_RECEIPT_FAILURE,
    EDIT_RECEIPT_REQUEST, EDIT_RECEIPT_SUCCESS, EDIT_RECEIPT_FAILURE,
    DELETE_RECEIPT_REQUEST, DELETE_RECEIPT_SUCCESS, DELETE_RECEIPT_FAILURE,
    USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAILURE,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILURE,
    USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILURE,
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
    USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE,
    SET_USER_ID
} from '../constants/ActionTypes';

const initialState = {
    userName: null,
    userUuid: null,
    isApproved: false,
    receipts: [],
    userId: null,
    error: null
};

export default function receipts(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ID:
            return Object.assign({}, state, {
                userId: action.userId
            });
        case ADD_RECEIPT_REQUEST:
        case EDIT_RECEIPT_REQUEST:
        case DELETE_RECEIPT_REQUEST:
        case USER_CREATE_REQUEST:
        case USER_DELETE_REQUEST:
        case USER_EDIT_REQUEST:
        case USER_LOGIN_REQUEST:
        case USER_LOGOUT_REQUEST:
            return Object.assign({}, state, {
                error: null
            });
        case ADD_RECEIPT_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                receipts: [action.receipt, ...state.receipts]
            });
        case EDIT_RECEIPT_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                receipts: state.receipts.map(receipt =>
                        receipt.id === action.receipt.id ?
                            action.receipt :
                            receipt
                        )
            });
        case DELETE_RECEIPT_SUCCESS:
            return Object.assign({}, state, {
                error: 'foo: delete receipt success',
                receipts: state.receipts.filter(receipt =>
                        receipt.id !== action.receipt.id)
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
                error: null,
            });
        case USER_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                userName: null,
                userUuid: null,
                isApproved: false,
                error: null,
            });
        case ADD_RECEIPT_FAILURE:
        case EDIT_RECEIPT_FAILURE:
        case DELETE_RECEIPT_FAILURE:
        case USER_CREATE_FAILURE:
        case USER_EDIT_FAILURE:
        case USER_LOGIN_FAILURE:
        case USER_LOGOUT_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isApproved: false,
                error: action.error,
            });
        default:
            return state;
    }
}
