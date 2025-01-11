import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../actions/productAction";
import Product from "../Product/Product";
import "./ProductLists.css";

const ProductLists = () => {
	const dispatch = useDispatch();
	const productLists = useSelector(state => state.products.products);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);


	return productLists && !productLists.length ? (
		<h3>No products to show</h3>
	) : (
		<div className="productlist-container">
			<div className="ui grid productlist">
				{productLists.map(product => (
					<Product
						key={product._id}
						product={product}
						className="three wide column"
						sx={{ paddingLeft: 0, paddingRight: 0 }}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductLists;
