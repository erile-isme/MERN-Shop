import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { findProduct } from "../../actions/productAction";
import ProductFilter from "../Filter/ProductFilter";

const ProductSearch = () => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("name");
	const searchedProducts = useSelector(state => state?.products?.searchedProducts);

	console.log(searchTerm)
	console.log(searchedProducts)

	
	useEffect(() => {
		if (searchTerm) dispatch(findProduct(searchTerm));
	}, [dispatch, searchTerm]);

	return (
		<div>
			{searchedProducts && searchedProducts.length > 0 && (
				<ProductFilter allProducts={searchedProducts} />
			)}
		</div>
	);
};

export default ProductSearch;
