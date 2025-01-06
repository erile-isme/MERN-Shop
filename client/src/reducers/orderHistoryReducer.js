import {
	FETCH_ALL_HISTORY,
	FETCH_LATEST,
	ADD_HISTORY,
	GET_ORDER,
} from "../constants/actionTypes";

const orderHistory = (orderHistory = [], action) => {
	switch (action.type) {
		case FETCH_ALL_HISTORY:
			return action.payload;
		case FETCH_LATEST:
			return [action.payload];
		case GET_ORDER:
			return [action.payload];
		case ADD_HISTORY:
			return {
				message: action.payload.message,
				newOrderHistory: action.payload.data,
			};
		default:
			return orderHistory;
	}
};

export default orderHistory;
