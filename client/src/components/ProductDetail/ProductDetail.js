import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import "./ProductDetail.css";

const ProductDetail = () => {
	const [size, setSize] = useState("");
	const [volumn, setVolumn] = useState(1);

	const handleChange = event => {
		setSize(event.target.value);
	};

	const { category, productId } = useParams();
	const product = useSelector(state => state.products).filter(
		prod => prod._id === productId
	)[0];

	console.log("PRODUCT: ", product);

	return (
		<div>
			{product && (
				<div className="info-container">
					<div className="ui breadcrumb">
						<a className="section" href="/">
							Home
						</a>
						<i class="right chevron icon divider"></i>
						<div className="active section">{category}</div>
					</div>
					<div className="ui grid info">
						<div className="ten wide column info-left">
							<div className="img">
								{product.img.map((img, index) => (
									<img
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
								<div class="ui divider"></div>
								<h3>Features</h3>
								<p>{product.description.features}</p>
								<div class="ui divider"></div>
								<h3>Details</h3>
								<p>{product.description.details}</p>
								<div class="ui divider"></div>
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
								<div class="ui divider"></div>
								{product.reviews.map(review => (
									<div className="review">
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
							morning like clockwork. He mentally prepared himself to once again
							deal with what was about to happen, but this time he also placed a
							knife in his pocket just in case. Bryan had made peace with
							himself and felt comfortable with the choices he made. This had
							made all the difference in the world. Being alone no longer
							bothered him and this was essential since there was a good chance
							he might spend the rest of his life alone in a cell. She glanced
							up into the sky to watch the clouds taking shape. First, she saw a
							dog. Next, it was an elephant. Finally, she saw a giant umbrella
							and at that moment the rain began to pour. Have you ever wondered
							about toes? Why 10 toes and not 12. Why are some bigger than
							others? Some people can use their toes to pick up things while
							others can barely move them on command. Some toes are nice to look
							at while others are definitely not something you want to look at.
							Toes can be stubbed and make us scream. Toes help us balance and
							walk. 10 toes are just something to ponder. The rain was coming.
							Everyone thought this would be a good thing. It hadn't rained in
							months and the earth was dry as a bone. It wasn't a surprise that
							everyone thought a good rain was what was needed, but they never
							expected how much rain would actually arrive.
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
												onChange={handleChange}
											>
												{product.size.map((size, index) => (
													<MenuItem className="size" value={index}>
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
							<div className="volumn-container">
								<div className="volumn">
									<FaMinus
										className="volumn-icon"
										onClick={() => {
											if (volumn > 0) {
												let numVolumn = volumn;
												setVolumn(--numVolumn);
											}
										}}
									/>
									<p>{volumn}</p>
									<FaPlus
										className="volumn-icon"
										onClick={() => {
											if (volumn < product.numInStock) {
												let numVolumn = volumn;
												setVolumn(++numVolumn);
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
									console.log("add to cart");
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
