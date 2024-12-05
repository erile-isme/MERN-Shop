import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

export const fetchProd = () => API.get('/products');

export const createProd = (product) => API.post('/products', product);

export const fetchCates = () => API.get(`/categories`);

export const createCate = product => API.post(`/categories`, product);

export const getProduct = (id) => API.get(`/products/:${id}`);
