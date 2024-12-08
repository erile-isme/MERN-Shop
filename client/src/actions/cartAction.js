import * as api from "../api";
import { FETCH_CART, ADD_CART, REMOVE_CART } from "../constants/actionTypes";

export const fetchCart = () => async dispatch => {
	try {
		const { data } = await api.fetchCart();
		console.log(data[0].productId.name);
		dispatch({ type: FETCH_CART, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const addItemToCart = cartItem => async dispatch => {
	try {
		const { data } = await api.addItemToCart(cartItem);
		dispatch({ type: ADD_CART, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const removeItemFromCart = () => async dispatch => {
	try {
		const { data } = await api.removeItemFromCart();
		dispatch({ type: REMOVE_CART, payload: data });
	} catch (error) {
		console.log(error);
	}
};
