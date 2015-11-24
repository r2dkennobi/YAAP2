import {
    ADD_RECEIPT_REQUEST, ADD_RECEIPT_SUCCESS, ADD_RECEIPT_FAILURE,
    EDIT_RECEIPT_REQUEST, EDIT_RECEIPT_SUCCESS, EDIT_RECEIPT_FAILURE,
    DELETE_RECEIPT_REQUEST, DELETE_RECEIPT_SUCCESS, DELETE_RECEIPT_FAILURE,
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE,
    USER_LOGOUT_SUCCESS,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
    EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
    userName: '',
    userId: '',
    userEmail: '',
    receipts: [],
    error: null
};

export default function receipts(state = initialState, action) {
    switch (action.type) {
        case ADD_RECEIPT_REQUEST:
        case EDIT_RECEIPT_REQUEST:
        case DELETE_RECEIPT_REQUEST:
        case USER_LOGIN_REQUEST:
        case CREATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case EDIT_USER_REQUEST:
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
                receipts: state.receipts.filter(receipt =>
                        receipt.id !== action.receipt.id)
            });
        case USER_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                userName: action.user[0].userName,
                userId: action.user[0].userId,
                userEmail: action.user[0].userEmail,
                error: null,
            });
        case USER_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                userName: '',
                userId: '',
                userEmail: '',
                error: null,
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                userName: state.userName,
                userId: state.userId,
                userEmail: state.userEmail,
                error: null,
            });
        case EDIT_USER_SUCCESS:
            return Object.assign({}, state, {
                userName: action.user.userName,
                userId: action.user.userId,
                userEmail: action.user.userEmail,
                error: null,
            });
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                userName: '',
                userId: '',
                userEmail: '',
                error: null,
            });
        case ADD_RECEIPT_FAILURE:
        case EDIT_RECEIPT_FAILURE:
        case DELETE_RECEIPT_FAILURE:
        case USER_LOGIN_FAILURE:
        case CREATE_USER_FAILURE:
        case EDIT_USER_FAILURE:
        case DELETE_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
            });
        default:
            return state;
    }
}
