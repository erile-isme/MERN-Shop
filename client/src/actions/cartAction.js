import * as api from "../api";
import {
	FETCH_CART,
	ADD_CART,
	UPDATE_CART,
	REMOVE_CART,
} from "../constants/actionTypes";

export const fetchCart = () => async dispatch => {
	try {
		const { data } = await api.fetchCart();
		dispatch({ type: FETCH_CART, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const addItemToCart = cartItem => async dispatch => {
	try {
		const { data } = await api.addItemToCart(cartItem);
		dispatch({ type: ADD_CART, payload: data.cart });
	} catch (error) {
		console.log(error);
	}
};

export const updateCartItem = cartItem => async dispatch => {
	try {
		const { data } = await api.updateCartItem(cartItem);
		dispatch({ type: UPDATE_CART, payload: data.cart });
	} catch (error) {
		console.log(error);
	}
};

export const removeItemFromCart = id => async dispatch => {
	console.log(id);
	try {
		const { data } = await api.removeItemFromCart(id);
		dispatch({ type: REMOVE_CART, payload: data.cartItem });
	} catch (error) {
		console.log(error);
	}
};
