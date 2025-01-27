import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { MdOutlineFavorite } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addOrRemoveFavorites } from "../../actions/favoriteAction";
import { MdShoppingCart } from "react-icons/md";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./ProductShortcut.css";

const ProductShortcut = ({ product, favorites, setFavoriteUpdated }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(favorites.some(fav => fav._id === product._id));
	}, [favorites, product._id]);

	const handleFavorites = productId => {
		if (!localStorage.getItem("token")) {
			navigate(`/login?redirect=${window.location.pathname}`);
			return;
		}
		dispatch(addOrRemoveFavorites({ productId }));
		setFavoriteUpdated(true);
	};

	return (
		product && (
			<Card key={product._id} className="product-info" variant="outlined">
				<img
					className="product-img"
					src={`${process.env.REACT_APP_PROD}/${product.img[0]}`}
					alt={product.description}
				/>
				<nav>
					<div className="product-icon">
						<div className="search-icon">
							<div
								className="product-link"
								onClick={() =>
									navigate(`/products/${product.category.name}/${product._id}`)
								}
							>
								<MdShoppingCart />
							</div>
						</div>
						<div className="fav-icon">
							<div
								className="product-link"
								onClick={() => handleFavorites(product._id)}
							>
								{isFavorite ? (
									<MdOutlineFavorite />
								) : (
									<FavoriteBorderOutlinedIcon />
								)}
							</div>
						</div>
					</div>
				</nav>
			</Card>
		)
	);
};

export default ProductShortcut;
