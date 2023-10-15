import * as api from '../api';
import { FETCH_ALL, CREATEPROD, GETPROD } from '../constants/actionTypes';

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProd();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createProd(product);
    dispatch({ type: CREATEPROD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProduct(id);
    dispatch({ type: GETPROD, payload: data });
  } catch (error) {
    console.log(error);
  }
};
