import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./Product.css";

const Product = ({ product }) => {
	return (
		product && (
			<Card key={product._id} className="product-info" variant="outlined">
				<img
					className="product-img"
					src={`http://localhost:5000/uploads/${product.img[0].replace(
						"resources\\",
						""
					)}`}
					alt={product.description}
				/>
				<nav>
					<div className="product-icon">
						<div className="search-icon">
							<Link
								to={`/products/${product.category.name}/${product._id}`}
								className="product-link"
							>
								<SearchOutlinedIcon />
							</Link>
						</div>
						<div className="fav-icon">
							<Link to="/productfav" className="product-link">
								<FavoriteBorderOutlinedIcon />
							</Link>
						</div>
						<div className="cart-icon">
							<Link to="/cart" className="product-link">
								<ShoppingCartOutlinedIcon />
							</Link>
						</div>
					</div>
				</nav>
			</Card>
		)
	);
};

export default Product;
