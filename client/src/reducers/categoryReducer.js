import { FETCH_CATE, CREATE_CATE } from "../shared/actionTypes";

const categories = (categories = [], action) => {
	switch (action.type) {
		case FETCH_CATE:
			return action.payload;
		case CREATE_CATE:
			return [...categories, action.payload];
		default:
			return categories;
	}
};

export default categories;
