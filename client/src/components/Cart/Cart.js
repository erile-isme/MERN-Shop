import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCart,
	removeItemFromCart,
	updateCartItem,
} from "../../actions/cartAction";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { TAX } from "../../constants/actionTypes";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Cart = () => {
	const handleLogoutOnTokenExpiration = () => {
		const token = localStorage.getItem("token");

		if (token) {
			const decoded = jwt.decode(token);
			const currentTime = Date.now() / 1000; // Current time in seconds

			if (decoded.exp < currentTime) {
				// Token has expired, perform logout
				console.warn("Token has expired. Logging out...");
				localStorage.removeItem("token");
				navigate("/");
			}
		}
	};

	// Check token expiration every 10 mins
	useEffect(() => {
		const interval = setInterval(handleLogoutOnTokenExpiration, 300000);
		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [cartUpdated, setCartUpdated] = useState(false);

	const calculateTotal = () => {
		let total = 0;
		cartList.map(item => (total += item.price * item.quantity));
		return Math.round(total * 100) / 100;
	};
	const calculateTax = () => {
		return Math.round(calculateTotal() * TAX * 100) / 100;
	};

	const cartList = useSelector(state => state.cart);
	console.log(cartList);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (localStorage.getItem("token")) {
			window.scrollTo(0, 0);
			dispatch(fetchCart());
		} else {
			navigate(`/login?redirect=${window.location.pathname}`);
		}
	}, [dispatch, navigate]);

	useEffect(() => {
		if (cartUpdated) {
			dispatch(fetchCart());
			setCartUpdated(false);
		}
	}, [cartUpdated, dispatch]);

	const handleUpdateQuantity = (item, newQuantity, color, size) => {
		console.log(item);
		console.log(newQuantity);
		if (newQuantity >= 0) {
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
	};

	return (
		<div className="ui container cart-container">
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
												src={`http://localhost:5000/uploads/${item.img.replace(
													"resources\\",
													""
												)}`}
												alt={item.name}
											/>
										</div>
										<div className="thirteen wide column">
											<div className="item-title">
												<h2>Item {item.name}</h2>
												<MdClose
													className="item-icon"
													onClick={() =>
														removeCartItem(
															item.productId,
															item.size,
															item.color
														)
													}
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
														onClick={() => {
															console.log("PLUS");
															handleUpdateQuantity(
																item,
																item.quantity + 1,
																item.color,
																item.size
															);
														}}
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
							<div className="total-summary">
								<table className="summary-table">
									<thead>
										<tr>
											<th colSpan="2" className="summary-title">
												<h3>Order Summary | {cartList.length} ITEMS</h3>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<p>Item(s) subtotal</p>
											</td>
											<td className="value">
												<p>CAD ${calculateTotal()}</p>
											</td>
										</tr>
										<tr>
											<td>
												<h4>SUBTOTAL</h4>
											</td>
											<td className="value">
												<h4>CAD ${calculateTotal()}</h4>
											</td>
										</tr>
										<tr>
											<td>
												<p>Estimated Tax</p>
											</td>
											<td className="value">
												<p>CAD ${calculateTax()}</p>
											</td>
										</tr>
										<tr>
											<td>
												<h3>ORDER TOTAL</h3>
											</td>
											<td className="value">
												<h3>
													CAD $
													{Math.round(
														(calculateTax() + calculateTotal()) * 100
													) / 100}
												</h3>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div>
								<div className="ui divider"></div>
								<div className="order-coupon">
									<RiCoupon3Line />
									<p>Coupon</p>
								</div>
								<div className="ui divider"></div>
							</div>
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
