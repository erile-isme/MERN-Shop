import * as api from "../api";
import {
	FETCH_ALL_HISTORY,
	FETCH_LATEST,
	ADD_HISTORY,
	GET_ORDER,
} from "../constants/actionTypes";

export const fetchAllOrderHistory = () => async dispatch => {
	try {
		const { data } = await api.fetchAllOrderHistory();
		dispatch({ type: FETCH_ALL_HISTORY, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const fetchLatestOrder = () => async dispatch => {
	try {
		const { data } = await api.fetchLatestOrder();
		dispatch({ type: FETCH_LATEST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getOrderHistory = id => async dispatch => {
	try {
		const { data } = await api.getOrderHistory(id);
		dispatch({ type: GET_ORDER, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const addToOrderHistory = product => async dispatch => {
	try {
		const { data } = await api.addToOrderHistory(product);
		dispatch({ type: ADD_HISTORY, payload: data });
	} catch (error) {
		console.log(error);
	}
};
