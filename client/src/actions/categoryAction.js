import * as api from '../api';
import { FETCHCATE, CREATECATE } from '../constants/actionTypes';

export const getCate = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCates();
    dispatch({ type: FETCHCATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCate = (product) => async (dispatch) => {
  try {
    const { data } = await api.createCate(product);
    dispatch({ type: CREATECATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
