import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoShareOutline, IoHeartOutline } from "react-icons/io5";
import {
	Rating,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@mui/material";
import { getProduct } from "../../actions/productAction";
import { addItemToCart } from "../../actions/cartAction";
import "./ProductDetail.css";

const ProductDetail = () => {
	const dispatch = useDispatch();
	const [size, setSize] = useState(0);
	const [colorIndex, setColorIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const { productId } = useParams();
	const product = useSelector(state => state.products.product);

	useEffect(() => {
		dispatch(getProduct(productId));
	}, [dispatch, productId]);

	const handleSizeChange = event => {
		setSize(event.target.value);
	};

	return (
		<div>
			{product && (
				<div className="info-container">
					<div className="ui breadcrumb">
						<a className="section" href="/">
							Home
						</a>
						<i className="right chevron icon divider"></i>
						<div className="active section">{product.category.name}</div>
					</div>
					<div className="ui grid info">
						<div className="nine wide column info-left">
							<div className="img">
								{product.img.map((img, index) => (
									<img
										key={index}
										src={`http://localhost:5000/uploads/${img.replace(
											"resources\\",
											""
										)}`}
										alt="abc"
									/>
								))}
							</div>
							<div className="description">
								<h2>Decription</h2>
								<div className="ui divider"></div>
								<h3>Features</h3>
								<p>{product.description.features}</p>
								<div className="ui divider"></div>
								<h3>Details</h3>
								<p>{product.description.details}</p>
								<div className="ui divider"></div>
								<h3>Materials</h3>
								<p>{product.description.materials}</p>
							</div>
							<div className="reviews">
								<h2>Reviews</h2>
								<div className="rating">
									<Rating
										readOnly
										name="read-only"
										size="small"
										value={product.rating ? product.rating : 4.5}
										precision={0.5}
									/>
									<span>
										{product.rating ? product.rating : 4.5}
										{` (${product.reviews.length})`}
									</span>
								</div>
								<div className="ui divider"></div>
								{product.reviews.map((review, index) => (
									<div key={index} className="review">
										<div className="user-review">
											{review.user ? review.user : ""}
										</div>
										<div className="review rating">
											<Rating
												readOnly
												name="read-only"
												size="small"
												value={review.rating ? review.rating : 4}
												precision={0.5}
											/>
											<p>
												{review.timestamp
													? review.timestamp
													: new Date().toLocaleDateString()}
											</p>
										</div>
										<p>
											{review.product ? `Product: ${review.product.color}` : ""}
											{review.product ? `Type: ${review.product.type}` : ""}
										</p>
										<br />
									</div>
								))}
							</div>
							The headphones were on. They had been utilized on purpose. She
							could hear her mom yelling in the background, but couldn't make
							out exactly what the yelling was about. That was exactly why she
							had put them on. She knew her mom would enter her room at any
							minute, and she could pretend that she hadn't heard any of the
							previous yelling. She looked at her little girl who was about to
							become a teen. She tried to think back to when the girl had been
							younger but failed to pinpoint the exact moment when she had
							become a little too big to pick up and carry. It hit her all at
							once. She was no longer a little girl and she stood there
							speechless with fear, sadness, and pride all running through her
							at the same time. It was always the Monday mornings. It never
							seemed to happen on Tuesday morning, Wednesday morning, or any
							other morning during the week. But it happened every Monday
						</div>
						<div className="six wide column info-product">
							<div className="title-container">
								<div className="title-content">
									<div className="title">{product.name}</div>
									<div className="rating">
										<Rating
											readOnly
											name="read-only"
											size="small"
											value={product.rating ? product.rating : 0}
											precision={0.5}
										/>
										{product.rating ? product.rating : 0}
									</div>
								</div>
								<div className="title-icons">
									<IoHeartOutline />
									<IoShareOutline />
								</div>
							</div>
							<div>
								{product.color.length > 0 && (
									<React.Fragment>
										<div className="ui horizontal list">
											{product.color.map((color, index) => (
												<div
													key={index}
													className={`item color ${
														index === colorIndex ? "active" : ""
													}`}
													style={{
														backgroundColor: color,
													}}
													onClick={() => setColorIndex(index)}
												></div>
											))}
										</div>
										<p>Color: {product.colorName[colorIndex]}</p>
									</React.Fragment>
								)}
								{product.size.length > 0 && (
									<React.Fragment>
										<FormControl variant="standard" sx={{ m: 1, width: 100 }}>
											<InputLabel id="demo-simple-select-standard-label">
												Size
											</InputLabel>
											<Select
												labelId="demo-simple-select-standard-label"
												id="demo-simple-select-standard"
												value={size}
												label="Size"
												onChange={handleSizeChange}
											>
												{product.size.map((size, index) => (
													<MenuItem key={index} className="size" value={index}>
														{size}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<p>Size: Women {product.size[size]}</p>
									</React.Fragment>
								)}
							</div>
							<div className="price-container">
								<h2 className="price">CAD ${product.price}</h2>
							</div>
							<div className="quantity-container">
								<div className="quantity">
									<FaMinus
										className="quantity-icon"
										onClick={() => {
											if (quantity > 0) {
												let numVolumn = quantity;
												setQuantity(--numVolumn);
											}
										}}
									/>
									<p>{quantity}</p>
									<FaPlus
										className="quantity-icon"
										onClick={() => {
											if (quantity < product.numInStock) {
												let numVolumn = quantity;
												setQuantity(++numVolumn);
											}
										}}
									/>
								</div>
								{product.numInStock > 0 && product.numInStock < 10
									? "Low stock"
									: "In stock"}
							</div>
							<button
								className="ui button add-cart"
								type="button"
								onClick={() => {
									const cartItem = {
										productId: product._id,
										quantity: quantity,
										size: product.size[size],
										color: product.colorName[colorIndex],
									};
									dispatch(addItemToCart(cartItem));
								}}
							>
								ADD TO CART
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
