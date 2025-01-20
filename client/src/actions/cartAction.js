import * as api from "../api";
import {
	FETCH_CART,
	ADD_CART,
	UPDATE_CART,
	REMOVE_CART,
	REMOVE_ALL,
	CART_ERROR,
} from "../constants/actionTypes";

export const fetchCart = () => async dispatch => {
	try {
		const { data } = await api.fetchCart();
		dispatch({ type: FETCH_CART, payload: data.userCart });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 400) {
			dispatch({
				type: CART_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};

export const addItemToCart = cartItem => async dispatch => {
	try {
		const { data } = await api.addItemToCart(cartItem);
		dispatch({ type: ADD_CART, payload: data.userCart });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 400) {
			dispatch({
				type: CART_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};

export const updateCartItem = cartItem => async dispatch => {
	try {
		const { data } = await api.updateCartItem(cartItem);
		dispatch({ type: UPDATE_CART, payload: data.userCart });
	} catch (error) {
		console.log(error);
		if (
			error.response &&
			(error.response.status === 500 || error.response.status === 400)
		) {
			dispatch({
				type: CART_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};

export const removeItemFromCart = removedItem => async dispatch => {
	try {
		const { data } = await api.removeItemFromCart(removedItem);
		dispatch({ type: REMOVE_CART, payload: data.userCart });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 500) {
			dispatch({
				type: CART_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};

export const removeAllFromCart = () => async dispatch => {
	try {
		const { data } = await api.removeAllFromCart();
		dispatch({ type: REMOVE_ALL, payload: data });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 500) {
			dispatch({
				type: CART_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};