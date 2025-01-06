import { combineReducers } from 'redux';
import products from "./productReducer";
import categories from "./categoryReducer";
import cart from "./cartReducer";
import user from "./userReducer";
import orderHistory from "./orderHistoryReducer";
// import auth from './auth';

export default combineReducers({
	products,
	categories,
	cart,
	user,
	orderHistory,
});
