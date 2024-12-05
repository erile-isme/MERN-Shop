import React from "react";
import { useSelector } from "react-redux";
import Product from "../Products/Product/Product";
import "./ProductLists.css";

const ProductLists = () => {
	const productLists = useSelector(state => state.products);
	const productList = productLists.filter(p => p.isSlider !== true);
	console.log("PRODUCTLIST:", productLists);

	return !productLists.length ? (
		<h3>No products to show</h3>
	) : (
		<div className="productlist-container">
			<div className="ui grid productlist">
				{productList.map(product => (
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
