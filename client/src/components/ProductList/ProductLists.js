import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Products/Product/Product";
import "./ProductLists.css";
import { fetchAllProducts } from "../../actions/productAction";

const ProductLists = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const productLists = useSelector(state => state.products.products);
	console.log("PRODUCTLIST:", productLists);

	return !productLists.length ? (
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
