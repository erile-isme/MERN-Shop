import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCart,
	removeItemFromCart,
	updateCartItem,
} from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import { OrderProvider } from "../OrderSummary/OrderProvider";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { fetchFavorites } from "../../actions/favoriteAction";
import OrderSummary from "../OrderSummary/OrderSummary";
import Loading from "../Loading/Loading";
import "./Cart.css";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [cartUpdated, setCartUpdated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const cartList = useSelector(state => state?.cart);
	const favorites = useSelector(state => state?.favorites);

	useEffect(() => {
		window.scroll(0, 0);
		if (localStorage.getItem("token")) {
			dispatch(fetchCart());
			dispatch(fetchFavorites());
			if (cartUpdated) {
				setIsLoading(false);
				setCartUpdated(false);
			}
		} else {
			navigate(`/login?redirect=${window.location.pathname}`);
		}
	}, [dispatch, navigate, cartUpdated]);

	const handleUpdateQuantity = (productId, newQuantity, color, size) => {
		if (newQuantity > 0) {
			dispatch(
				updateCartItem({
					productId,
					quantity: newQuantity,
					color,
					size,
				})
			);
			setCartUpdated(true);
		}
	};

	const removeCartItem = itemId => {
		dispatch(removeItemFromCart(itemId)).then(() => {
			setCartUpdated(true);
			setIsLoading(false);
		});
	};

	return (
		<div className="ui container cart-container">
			<Loading show={isLoading} />
			<div className="ui breadcrumb">
				<a className="section" href="/">
					Home
				</a>
				<i className="right chevron icon divider"></i>
				<div className="active section">Cart</div>
			</div>
			<div className="cart-content">
				<h1>SHOPPING CART</h1>
				{cartList && cartList.length > 0 ? (
					<div className="ui grid cart-items">
						<div className="ten wide column">
							{cartList.map((item, index) => (
								<div key={index}>
									<div className="ui grid">
										<div className="three wide column">
											<img
												className="cart-img"
												src={`${process.env.REACT_APP_PROD}/${item.img}`}
												alt={item.name}
											/>
										</div>
										<div className="thirteen wide column">
											<div className="item-title">
												<Link
													to={`/products/${
														item.categoryId.name
													}/${item.productId.toString()}`}
												>
													<h2>{item.name.toUpperCase()}</h2>
												</Link>
												<MdClose
													className="item-icon"
													onClick={() => {
														setIsLoading(true);
														removeCartItem(item._id.toString());
														setCartUpdated(true);
													}}
												/>
											</div>
											<div className="item-content">
												<p>{item.color ? `Color: ${item.color}` : ""}</p>
												<p>{item.size ? `Size: ${item.size}` : ""}</p>
												<h3>CAD $ {item.price}</h3>
												<div className="quantity">
													<FaMinus
														className="quantity-icon"
														onClick={() =>
															handleUpdateQuantity(
																item.productId,
																item.quantity - 1,
																item.color,
																item.size
															)
														}
													/>
													<p>{item.quantity}</p>
													<FaPlus
														className="quantity-icon"
														onClick={() =>
															handleUpdateQuantity(
																item.productId,
																item.quantity + 1,
																item.color,
																item.size
															)
														}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="ui divider"></div>
								</div>
							))}
						</div>
						<div className="five wide column order-summary">
							<OrderProvider>
								<OrderSummary paymentState={0} cartUpdated={cartUpdated} />
							</OrderProvider>
							<button className="checkout-button">
								<Link to="/payment">
									<h4>CHECKOUT</h4>
								</Link>
							</button>
							<button className="shopping-button">
								<Link to="/">
									<h4>CONTINUE SHOPPING</h4>
								</Link>
							</button>
						</div>
					</div>
				) : (
					<h4>Your cart is currently empty</h4>
				)}
			</div>
			<div className="favorites-content">
				<h1>YOUR FAVORITES</h1>
				<div className="favorites-cards">
					{favorites &&
						favorites.length > 0 &&
						favorites.map(item => (
							<div key={item._id} className="ui card favorites">
								<div>
									<img
										className="img-favorite"
										src={`${process.env.REACT_APP_PROD}/${item.img[0]}`}
										alt={item.name}
									/>
								</div>
								<div className="content">
									<Link
										to={`/products/${item.category.name}/${item._id}`}
										className="header"
									>
										{item.name}
									</Link>
									<div className="meta">
										<span className="date">Women</span>
									</div>
									<div className="description">{item.description.features}</div>
								</div>
								<div className="extra content prodcate">
									<h3>CAD $ {item.price}</h3>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Cart;
