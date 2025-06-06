import * as api from '../api';
import {
	FETCH_ALL,
	CREATEPROD,
	GETPROD,
	FINDPROD,
	GETPROD_CATE,
	FETCH_SLIDER,
} from "../shared/actionTypes";

export const fetchAllProducts = () => async dispatch => {
	try {
		const { data } = await api.fetchProd();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const fetchSlider = () => async dispatch => {
	try {
		const { data } = await api.fetchSlider();
		dispatch({ type: FETCH_SLIDER, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const uploadPhotos = formData => async dispatch => {
	await api.uploadPhotos(formData);
};

export const createProduct = product => async dispatch => {
	try {
		const { data } = await api.createProd(product);
		dispatch({ type: CREATEPROD, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getProduct = id => async dispatch => {
	try {
		const { data } = await api.getProduct(id);
		dispatch({ type: GETPROD, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const findProduct = productName => async dispatch => {
	try {
		const { data } = await api.findProduct(productName);
		console.log(data);
		dispatch({ type: FINDPROD, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getProductsInCategory = cateId => async dispatch => {
	try {
		const { data } = await api.getProductsInCategory(cateId);
		dispatch({ type: GETPROD_CATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
