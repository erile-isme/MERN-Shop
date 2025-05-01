import React, { useEffect, useState } from "react";
import "./ProductBand.css";
import { useNavigate } from "react-router-dom";

const ProductBand = ({ product }) => {
	const navigate = useNavigate();
	const [imgpath, setImgpath] = useState("");
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");

	useEffect(() => {
		//Produc image
		if (Array.isArray(product.img)) setImgpath(product.img[0]);
		else setImgpath(product.img);

		//Color
		if (Array.isArray(product.color)) setColor(product.color[0]);
		else if (product.color) setColor(product.color);

		//Size
		if (Array.isArray(product.size)) setSize(product.size[0]);
		else if (product.size) setSize(product.size);
	}, [product.img, product.color, product.size]);

	return (
		<div>
			<div className="ui grid">
				<div
					className={
						window.location.pathname === "/payment"
							? "three wide column"
							: "six wide column"
					}
				>
					<img
						className={
							window.location.pathname === "/payment"
								? "item-img payment"
								: "item-img"
						}
						src={`${process.env.REACT_APP_PROD}/${imgpath}`}
						alt={product.name}
					/>
				</div>
				<div
					className={
						window.location.pathname === "/paymnent"
							? "thirteen wide column"
							: "ten wide column"
					}
				>
					<div className="item-title">
						<a
							href={() =>
								navigate(`/products/${product.category.name}/${product._id}`)
							}
						>
							<h2>{product.name.toUpperCase()}</h2>
						</a>
					</div>
					<div className="item-content">
						<p>{!color ? "" : `Color: ${color}`}</p>
						<p>{!size ? "" : `Size: ${size}`}</p>
						<h3>CAD $ {product.price}</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductBand;
