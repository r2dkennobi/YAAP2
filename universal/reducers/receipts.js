import {
    ADD_RECEIPT_REQUEST, ADD_RECEIPT_SUCCESS, ADD_RECEIPT_FAILURE,
    EDIT_RECEIPT_REQUEST, EDIT_RECEIPT_SUCCESS, EDIT_RECEIPT_FAILURE,
    DELETE_RECEIPT_REQUEST, DELETE_RECEIPT_SUCCESS, DELETE_RECEIPT_FAILURE,
    SET_USER_ID
} from '../constants/ActionTypes';

const initialState = {
    isWorking: false,
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
            return Object.assign({}, state, {
                isWorking: true,
                error: null
            });
        case ADD_RECEIPT_SUCCESS:
            return Object.assign({}, state, {
                isWorking: false,
                error: null,
                receipts: [action.receipt, ...state.receipts]
            });
        case EDIT_RECEIPT_SUCCESS:
            return Object.assign({}, state, {
                isWorking: false,
                error: null,
                receipts: state.receipts.map(receipt =>
                        receipt.id === action.receipt.id ?
                            action.receipt :
                            receipt
                        )
            });
        case DELETE_RECEIPT_SUCCESS:
            return Object.assign({}, state, {
                isWorking: false,
                error: 'foo: delete receipt success',
                receipts: state.receipts.filter(receipt =>
                        receipt.id !== action.receipt.id)
            });
        case ADD_RECEIPT_FAILURE:
        case EDIT_RECEIPT_FAILURE:
        case DELETE_RECEIPT_FAILURE:
            return Object.assign({}, state, {
                isWorking: false,
                error: action.error,
            });
        default:
            return state;
    }
}
