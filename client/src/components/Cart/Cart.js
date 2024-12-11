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

const Cart = () => {
	const dispatch = useDispatch();
	const [cartUpdated, setCartUpdated] = useState(false);

	const calculateTotal = () => {
		let total = 0;
		cartList.map(item => (total += item.productId.price * item.quantity));
		return Math.round(total * 100) / 100;
	};
	const calculateTax = () => {
		return Math.round(calculateTotal() * TAX * 100) / 100;
	};

	const cartList = useSelector(state => state.cart);
	console.log(cartList);

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	useEffect(() => {
		if (cartUpdated) {
			dispatch(fetchCart());
			setCartUpdated(false);
		}
	}, [cartUpdated, dispatch]);

	const handleUpdateQuantity = (item, newQuantity) => {
		if (newQuantity >= 0 && newQuantity <= item.productId.numInStock) {
			dispatch(
				updateCartItem({ productId: item.productId._id, quantity: newQuantity })
			);
			setCartUpdated(true);
		}
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
								<div key={item.productId._id}>
									<div className="ui grid">
										<div className="three wide column">
											<img src={item.productId.img[0]} alt="Testing" />
										</div>
										<div className="thirteen wide column">
											<div className="item-title">
												<h2>Item {item.productId.name}</h2>
												<MdClose
													className="item-icon"
													onClick={() => dispatch(removeItemFromCart(item._id))}
												/>
											</div>
											<div className="item-content">
												<p>{item.color ? `Color: ${item.color}` : ""}</p>
												<p>{item.type ? `Type: ${item.type}` : ""}</p>
												<p>{item.size ? `Size: ${item.size}` : ""}</p>
												<h3>CAD $ {item.productId.price}</h3>
												<div className="quantity">
													<FaMinus
														className="quantity-icon"
														onClick={() =>
															handleUpdateQuantity(item, item.quantity - 1)
														}
													/>
													<p>{item.quantity}</p>
													<FaPlus
														className="quantity-icon"
														onClick={() => {
															handleUpdateQuantity(item, item.quantity + 1);
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
								<h3>Order Summary | {cartList.length} ITEMS</h3>
								<p>Item(s) subtotal CAD ${calculateTotal()}</p>
								<h4>SUBTOTAL CAD ${calculateTotal()}</h4>
								<p>Estimated Tax CAD ${calculateTax()}</p>
								<h4>
									ORDER TOTAL CAD $
									{Math.round(calculateTax() + calculateTotal() * 100) / 100}
								</h4>
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
								<h4>CHECKOUT</h4>
							</button>
							<button className="shopping-button">
								<h4>CONTINUE SHOPPING</h4>
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
