import * as api from "../api";
import {
	FETCH_FAV,
	ADD_FAV,
	REMOVE_FAV,
	NEW_USER_FAV,
} from "../shared/actionTypes";

export const fetchFavorites = () => async dispatch => {
	try {
		const { data } = await api.fetchFavorites();
		const favoriteProductIds = data.userFav.favorites.map(fav => fav.product);
		dispatch({ type: FETCH_FAV, payload: favoriteProductIds });
	} catch (error) {
		console.log(error);
	}
};

export const addOrRemoveFavorites = productId => async dispatch => {
	try {
		const { data } = await api.addOrRemoveFavorites(productId);
		console.log(data);
		if (data.removedFav)
			dispatch({ type: REMOVE_FAV, payload: data.removedFav });
		else if (data.addedFav) dispatch({ type: ADD_FAV, payload: data.addedFav });
		else if (data.newUserFav)
			dispatch({ type: NEW_USER_FAV, payload: data.newUserFav });
	} catch (error) {
		console.log(error);
	}
};
