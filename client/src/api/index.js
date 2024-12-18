import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

//Products API
export const fetchProd = () => API.get("/products");
export const fetchSlider = () => API.get("/products/slider");
export const createProd = product => API.post("/products/uploads", product);
export const getProduct = id => API.get(`/products/${id}`);
export const getProductsInCategory = cateId =>
	API.get(`/products/categories/${cateId}`);

//Category API
export const fetchCates = () => API.get("/categories");
export const createCate = product => API.post("/categories", product);

//Cart API
export const fetchCart = () => {
	return API.get("/cart", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const addItemToCart = cartItem => {
	return API.post("/cart", cartItem, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const updateCartItem = cartItem => {
	return API.patch("/cart", cartItem, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const removeItemFromCart = removedId => {
	return API.patch("/cart/delete", removedId, {
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
	return API.get("/user", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
export const loginUser = user => API.post("/user/login", user);
export const registerUser = user => API.post("/user/register", user);
