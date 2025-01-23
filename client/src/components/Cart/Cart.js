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
import OrderSummary from "../OrderSummary/OrderSummary";
import Loading from "../Loading/Loading";
import "./Cart.css";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [cartUpdated, setCartUpdated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const cartList = useSelector(state => state.cart);

	useEffect(() => {
		window.scroll(0, 0);
		if (localStorage.getItem("token")) {
			dispatch(fetchCart());
			if (cartUpdated) {
				dispatch(fetchCart());
				setIsLoading(false);
			}
		} else {
			navigate(`/login?redirect=${window.location.pathname}`);
		}
	}, [dispatch, navigate, cartUpdated]);

	const handleUpdateQuantity = (item, newQuantity, color, size) => {
		if (newQuantity > 0) {
			dispatch(
				updateCartItem({
					productId: item.productId,
					quantity: newQuantity,
					color,
					size,
				})
			);
			setCartUpdated(true);
		}
	};

	const removeCartItem = (productId, size, color) => {
		dispatch(
			removeItemFromCart({
				productId,
				size,
				color,
			})
		);
		setCartUpdated(true);
		setIsLoading(false);
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
												<h2>{item.name.toUpperCase()}</h2>
												<MdClose
													className="item-icon"
													onClick={() => {
														setIsLoading(true);
														removeCartItem(
															item.productId,
															item.size,
															item.color
														);
														setCartUpdated(true);
													}}
												/>
											</div>
											<div className="item-content">
												<p>{item.color ? `Color: ${item.color}` : ""}</p>
												<p>{item.type ? `Type: ${item.type}` : ""}</p>
												<p>{item.size ? `Size: ${item.size}` : ""}</p>
												<h3>CAD $ {item.price}</h3>
												<div className="quantity">
													<FaMinus
														className="quantity-icon"
														onClick={() =>
															handleUpdateQuantity(
																item,
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
																item,
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
								<OrderSummary paymentState={0} />
							</OrderProvider>
							<button className="checkout-button">
								<Link to="/payment" className="payment-link">
									<h4>CHECKOUT</h4>
								</Link>
							</button>
							<button className="shopping-button">
								<Link to="/" className="shopping-link">
									<h4>CONTINUE SHOPPING</h4>
								</Link>
							</button>
						</div>
					</div>
				) : (
					<h4>Your cart is currently empty</h4>
				)}
			</div>
		</div>
	);
};

export default Cart;
