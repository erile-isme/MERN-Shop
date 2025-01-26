import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../actions/favoriteAction";
import ProductBand from "../Product/ProductBand";
import "./Wishlist.css";

const WishList = () => {
	const dispatch = useDispatch();
	const wishlist = useSelector(state => state?.favorites);

	useEffect(() => {
		if (localStorage.getItem("token")) dispatch(fetchFavorites());
	}, [dispatch]);

	return (
		wishlist &&
		wishlist.length > 0 && (
			<div className="ui container wishlist-container">
				<h1>WISH LIST</h1>
				<div className="wishlist-content">
					<p>{wishlist.length} Item(s)</p>
					{wishlist.map(product => (
						<ProductBand key={product._id} product={product} />
					))}
				</div>
			</div>
		)
	);
};

export default WishList;
