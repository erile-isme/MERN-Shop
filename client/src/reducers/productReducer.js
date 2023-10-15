import { FETCH_ALL, CREATEPROD, GETPROD } from '../constants/actionTypes';

export default (products = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATEPROD:
      return [...products, action.payload];
    case GETPROD:
      return products.filter((prod) => prod._id === action.payload);
    default:
      return products;
  }
};
