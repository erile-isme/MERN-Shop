import * as api from '../api';
import { FETCH_CATE, CREATE_CATE } from "../shared/actionTypes";

export const getCate = () => async dispatch => {
	try {
		const { data } = await api.fetchCates();
		dispatch({ type: FETCH_CATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createCate = product => async dispatch => {
	try {
		const { data } = await api.createCate(product);
		dispatch({ type: CREATE_CATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
