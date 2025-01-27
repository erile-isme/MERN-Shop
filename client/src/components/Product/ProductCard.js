import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
	// const dispatch = useDispatch();

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	console.log(product);

	return product ? (
		<div className="ui card">
			<div>
				<img
					className="img-prodcard"
					src={`${process.env.REACT_APP_PROD}/${product.img[0]}`}
					alt={product.name}
				/>
			</div>
			<div className="content">
				<Link
					to={`/products/${product.category.name}/${product._id}`}
					className="header"
				>
					{product.name}
				</Link>
				{/* <div className="meta">
									<span className="date">Women</span>
								</div> */}
				<div className="description">{product.description.features}</div>
			</div>
			<div className="extra content prodcard">
				<h3>CAD $ {product.price}</h3>
			</div>
		</div>
	) : (
		<h3>No products to show</h3>
	);
};

export default ProductCard;
