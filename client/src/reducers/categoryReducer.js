import { FETCHCATE, CREATECATE } from '../constants/actionTypes';

const categories = (categories = [], action) => {
	switch (action.type) {
		case FETCHCATE:
			return action.payload;
		case CREATECATE:
			return [...categories, action.payload];
		default:
			return categories;
	}
};

export default categories;