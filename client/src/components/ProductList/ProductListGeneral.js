import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../actions/productAction";
import "./ProductListGeneral.css";
import ProductFilter from "../Filter/ProductFilter";

const ProductListGeneral = () => {
	const dispatch = useDispatch();
	let productLists = useSelector(state => state?.products.products);
	console.log(productLists)

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return productLists && !productLists.length ? (
		<h3>No products to show</h3>
	) : (
		<ProductFilter allProducts={productLists} />
	);
};

export default ProductListGeneral;
