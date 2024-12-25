import * as api from "../api";
import {
	GET_USER,
	LOGIN,
	REGISTER,
	LOGIN_ERROR,
	REGISTER_ERROR,
} from "../constants/actionTypes";

export const getUser = () => async dispatch => {
	try {
		const { data } = await api.getUser();
		dispatch({ type: GET_USER, payload: data });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 401) {
			dispatch({
				type: LOGIN_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};

export const loginUser = user => async dispatch => {
	try {
		const { data } = await api.loginUser(user);
		dispatch({ type: LOGIN, payload: data });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 401) {
			dispatch({
				type: LOGIN_ERROR,
				payload: error.response.data.message,
			});
		}
	}
};

export const registerUser = user => async dispatch => {
	try {
		const { data } = await api.registerUser(user);
		dispatch({ type: REGISTER, payload: data });
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 400) {
			dispatch({
				type: REGISTER_ERROR,
				payload: error.response.data,
			});
		}
	}
};
