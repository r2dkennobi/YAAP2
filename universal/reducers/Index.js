import { combineReducers } from 'redux';
import ReceiptsReducer from './Receipts';
import UsersReducer from './Users';

const yaap2Reducer = combineReducers({
    ReceiptsReducer,
    UsersReducer
})

export default yaap2Reducer;
