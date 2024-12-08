import { FETCH_CART, ADD_CART, REMOVE_CART } from "../constants/actionTypes";

const cart = (cart = [], action) => {
	switch (action.type) {
		case FETCH_CART:
			console.log(action.payload);
			return action.payload;
		case ADD_CART:
			return [...cart, action.payload];
		case REMOVE_CART:
			return action.payload;
		default:
			return cart;
	}
};

export default cart;
