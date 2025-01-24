import {
	FETCH_CART,
	ADD_CART,
	UPDATE_CART,
	REMOVE_CART,
	REMOVE_ALL,
	CART_ERROR,
} from "../constants/actionTypes";

const cart = (cart = [], action) => {
	switch (action.type) {
		case FETCH_CART:
			return action.payload || [];
		case ADD_CART:
			return cart.map(item =>
				item._id === action.payload._id
					? { ...item, quantity: action.payload.quantity }
					: item
			);
		case UPDATE_CART:
			return cart.map(item =>
				item._id === action.payload._id
					? { ...item, quantity: action.payload.quantity }
					: item
			);
		case REMOVE_CART:
			return cart.filter(item => item._id !== action.payload._id);
		case REMOVE_ALL:
			return [];
		case CART_ERROR:
			return { ...cart, message: action.payload };
		default:
			return cart;
	}
};

export default cart;
