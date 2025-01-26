import {
	FETCH_FAV,
	ADD_FAV,
	REMOVE_FAV,
	NEW_USER_FAV,
} from "../shared/actionTypes";

const favorites = (favorites = [], action) => {
	switch (action.type) {
		case FETCH_FAV:
			return action.payload || [];
		case ADD_FAV:
		case REMOVE_FAV:
			return favorites.map(item =>
				item.user === action.payload.user
					? { ...item, favorites: action.payload.favorites }
					: item
			);
		case NEW_USER_FAV:
			return [...favorites, action.payload];
		default:
			return favorites;
	}
};

export default favorites;
