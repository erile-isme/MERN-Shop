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
export const fetchCart = () => API.get("/cart");
export const addItemToCart = cartItem => API.post("/cart", cartItem);
export const updateCartItem = cartItem => API.patch("/cart", cartItem);
export const removeItemFromCart = id => API.delete(`/cart/${id}`);
