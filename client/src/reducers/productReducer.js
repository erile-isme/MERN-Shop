import { FETCH_ALL, CREATEPROD, GETPROD } from '../constants/actionTypes';

const products = (products = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case CREATEPROD:
			return [...products, action.payload];
		case GETPROD:
			return products.filter(prod => prod._id === action.payload._id);
		default:
			return products;
	}
};

export default products;