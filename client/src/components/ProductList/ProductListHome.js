import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../actions/productAction";
import { fetchFavorites } from "../../actions/favoriteAction";
import ProductShortcut from "../Product/ProductShortcut";
import "./ProductListHome.css";

const ProductListHome = () => {
	const dispatch = useDispatch();
	const [favoriteUpdated, setFavoriteUpdated] = useState(false);
	const productLists = useSelector(state => state?.products.products);
	const favorites = useSelector(state => state?.favorites);
	const token = localStorage.getItem("token");

	useEffect(() => {
		dispatch(fetchAllProducts());
		console.log(favoriteUpdated);
		if (token || favoriteUpdated) {
			dispatch(fetchFavorites());
			setFavoriteUpdated(false);
		}
	}, [dispatch, token, favoriteUpdated]);

	return productLists && !productLists.length ? (
		<h3>No products to show</h3>
	) : (
		<div className="productlist-container">
			<div className="ui grid productlist">
				{productLists.map(product => (
					<ProductShortcut
						key={product._id}
						product={product}
						favorites={favorites}
						setFavoriteUpdated={setFavoriteUpdated}
						className="three wide column"
						sx={{ paddingLeft: 0, paddingRight: 0 }}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductListHome;
