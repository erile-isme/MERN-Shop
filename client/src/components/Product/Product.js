import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Product.css";

const Product = ({ product }) => {
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
					</div>
				</nav>
			</Card>
		)
	);
};

export default Product;
