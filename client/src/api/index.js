import axios from 'axios';

const API = axios.create({
	baseURL: process.env.REACT_APP_SERVER_PROD,
});

const isTokenExpired = () => {
	const expiration = localStorage.getItem("tokenExpiration");
	if (!expiration) return true;
	return Date.now() > parseInt(expiration, 10);
};

const checkAndRemoveToken = () => {
	if (isTokenExpired()) {
		localStorage.removeItem("token");
		localStorage.removeItem("tokenExpiration");
		console.error("Token expired and remove from localStorage");
	}
};

//Products API
export const fetchProd = () => API.get("/products");
export const fetchSlider = () => API.get("/products/slider");
export const createProd = product => API.post("/products/uploads", product);
export const getProduct = id => API.get(`/products/${id}`);
export const getProductsInCategory = cateId =>
	API.get(`/products/categories/${cateId}`);
export const uploadPhotos = formData =>
	API.post("/products/uploads-multi", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

//Category API
export const fetchCates = () => API.get("/categories");
export const createCate = product => API.post("/categories", product);

//Cart API
export const fetchCart = () => {
	checkAndRemoveToken();
	return API.get("/cart", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const addItemToCart = cartItem => {
	checkAndRemoveToken();
	return API.post("/cart", cartItem, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const updateCartItem = cartItem => {
	checkAndRemoveToken();
	return API.patch("/cart", cartItem, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const removeItemFromCart = removedId => {
	checkAndRemoveToken();
	return API.patch("/cart/delete", removedId, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const removeAllFromCart = () => {
	checkAndRemoveToken();
	return API.delete("/cart/delete-all", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};

//User API
export const getUser = () => {
	if (!localStorage.getItem("token")) {
		throw new Error("Token not found in localStorage");
	}
	checkAndRemoveToken();
	return API.get("/user", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const loginUser = user => API.post("/user/login", user);
export const registerUser = user => API.post("/user/register", user);

//Order History API
export const fetchAllOrderHistory = () => {
	checkAndRemoveToken();
	return API.get("/orderhistory/all", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const fetchLatestOrder = () => {
	checkAndRemoveToken();
	return API.get("/orderhistory", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const getOrderHistory = id => {
	checkAndRemoveToken();
	return API.get(`/orderhistory/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const addToOrderHistory = product => {
	checkAndRemoveToken();
	return API.post("/orderhistory", product, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};

//Favorites API
export const fetchFavorites = () => {
	checkAndRemoveToken();
	return API.get("/favorites", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
}
export const addOrRemoveFavorites = productId => {
	checkAndRemoveToken();
	return API.post("/favorites", productId, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};