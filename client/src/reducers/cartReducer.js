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
			return action.payload.orderItems;
		case ADD_CART:
			return action.payload;
		case UPDATE_CART:
			return action.payload.orderItems;
		case REMOVE_CART:
			return { message: action.payload.message };
		case REMOVE_ALL:
			return [];
		case CART_ERROR:
			return { message: action.payload };
		default:
			return cart;
	}
};

export default cart;
