import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllProducts, getProduct } from "./actions/productAction";
import { getCate } from "./actions/categoryAction";

import "./index.css";
import Home from "./components/Home/Home";
import Cart from "./components/cart/Cart";
import Payment from "./components/Payment/Payment";
import Login from "./components/Login/Login";
import Sale from "./components/Sale/Sale";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import ProductList from "./components/ProductList/ProductLists";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Navbar from "./components/Navbar/Navbar";
import ProdForm from "./components/Form/ProductForm";
import CateForm from "./components/Form/CategoryForm";
import ProductCategory from "./components/ProductList/ProductCategory";

const App = () => {
	const dispatch = useDispatch();
	const [currId, setCurrId] = useState(null);

	useEffect(() => {
		// if (currId) dispatch(getProduct(currId));
		dispatch(fetchAllProducts());
		dispatch(getCate());
	}, [dispatch]);

	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/products/:category/:productId"
						element={<ProductDetail />}
					/>
					<Route path="/products" element={<Products />} />
					<Route path="/categories/:categoryId" element={<ProductCategory />} />
					<Route path="/sale" element={Sale} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/addProd"
						element={<ProdForm currId={currId} setCurrId={setCurrId} />}
					/>
					<Route path="/addCate" element={<CateForm />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
