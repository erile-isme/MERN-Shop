import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import OrderSummary from "../OrderSummary/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import { addToOrderHistory } from "../../actions/orderHistoryAction";
import { useOrder } from "../OrderSummary/OrderProvider";
import "./Payment.css";
import { getUser } from "../../actions/userAction";

const Payment = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState(0);
	const [selectedMethod, setSelectedMethod] = useState("Credit Card");
	const [selectedShipping, setSelectedShipping] = useState("ship");
	const handleDeliveryDate = () => {
		const today = new Date();
		today.setDate(today.getDate() + Math.random() * 10);
		return new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
		}).format(today);
	};
	const deliveryDate = handleDeliveryDate();
	const { totalBeforeTax, tax, orderTotal, shippingFee } = useOrder();

	const cartList = useSelector(state => state.cart);
	const currUser = useSelector(state => state.user);

	useEffect(() => {
		dispatch(fetchCart());
		dispatch(getUser());
	}, [dispatch]);

	return (
		<div className="ui container checkout-container">
			<div className="ui breadcrumb">
				<a className="section" href="/">
					Home
				</a>
				<i className="right chevron icon divider"></i>
				<a className="section" href="/cart">
					Cart
				</a>
				<i className="right chevron icon divider"></i>
				<div className="active section">Delivery</div>
			</div>
			<div className="ui steps">
				<div className={`${state === 0 ? "active" : ""} step`}>
					<i className="truck icon"></i>
					<div className="content">
						<div className="title">Shipping</div>
						<div className="description">Choose your shipping options</div>
					</div>
				</div>
				<div className={`${state === 1 ? "active" : ""} step`}>
					<i className="payment icon"></i>
					<div className="content">
						<div className="title">Billing</div>
						<div className="description">Enter billing information</div>
					</div>
				</div>
				<div className={`${state === 2 ? "active" : ""} step`}>
					<i className="info icon"></i>
					<div className="content">
						<div className="title">Confirm Order</div>
					</div>
				</div>
			</div>
			<div className="ui grid">
				<div className="ten wide column checkout-content">
					{state === 0 && (
						<div className="delivery-content">
							<div className="delivery-title">
								<h2>1. DELIVERY OPTION</h2>
								<p>Eligible for shipping</p>
							</div>
							<div className="ui divider"></div>
							<div className="shipping-content">
								<div className="input-radios">
									<input
										type="radio"
										name="shippingAddress"
										id="ship"
										value="ship"
										checked={selectedShipping === "ship"}
										onChange={e => setSelectedShipping(e.target.value)}
									/>
									<div>
										<h4>Ship To Address</h4>
										<p>Shipping: ${shippingFee}</p>
										<p>Expected Deliver: {deliveryDate}</p>
									</div>
								</div>
								<div className="input-radios">
									<input
										type="radio"
										name="shippingAddress"
										id="pickup"
										value="pickup"
										checked={selectedShipping === "pickup"}
										onChange={e => setSelectedShipping(e.target.value)}
									/>
									<div>
										<h4>Click or Collect</h4>
										<p>Available pickup: {deliveryDate}</p>
									</div>
								</div>
							</div>
							<div className="ui divider"></div>
							<div className="delivery-address">
								<div className="ui grid">
									<div className="three wide column">
										<p>{currUser.name}</p>
									</div>
									<div className="ten wide column">
										<p>{currUser.address}</p>
										<p>{currUser.postalCode}</p>
										<p>{currUser.phone}</p>
									</div>
									<div className="three wide column">
										<div className="ui vertical animated button" tabIndex="0">
											<div className="hidden content">
												<FaCheck />
											</div>
											<div className="visible content">Selected</div>
										</div>
										{/* <button className="checkout-button">
										<Link to="/payment" className="payment-link">
											<h4>CHECKOUT</h4>
										</Link>
									</button> */}
									</div>
								</div>
							</div>
						</div>
					)}
					{state === 1 && (
						<div className="payment-container">
							<div className="order-details">
								<h2>ORDER ITEM(S)</h2>
								<div className="ui divider"></div>
								{cartList &&
									cartList.length > 0 &&
									cartList.map((item, index) => (
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
														<h2>{item.name.toUpperCase()}</h2>
													</div>
													<div className="item-content">
														<p>{item.color ? `Color: ${item.color}` : ""}</p>
														<p>{item.type ? `Type: ${item.type}` : ""}</p>
														<p>{item.size ? `Size: ${item.size}` : ""}</p>
														<p>Quantity: {item.quantity}</p>
														<h3>CAD $ {item.price}</h3>
													</div>
												</div>
											</div>
										</div>
									))}
							</div>
							<div className="payment-content">
								<h2>2. PAYMENT OPTION</h2>
								<p>Please select your payment option</p>
								<div className="ui divider"></div>
								<div className="input-radios">
									<div className="input-radio">
										<input
											type="radio"
											name="paymentMethod"
											id="creditCard"
											value="Credit Card"
											checked={selectedMethod === "Credit Card"}
											onChange={e => setSelectedMethod(e.target.value)}
										/>
										Credit Card
									</div>
									<div className="input-radio">
										<input
											type="radio"
											name="paymentMethod"
											id="paypal"
											value="PayPal"
											checked={selectedMethod === "PayPal"}
											onChange={e => {
												console.log(e.target.value);
												setSelectedMethod(e.target.value);
											}}
										/>
										PayPal
									</div>
								</div>
							</div>
						</div>
					)}
					{state !== 2 && (
						<div className="delivery-button">
							<button
								className="back-button"
								disabled={state === 0}
								onClick={() => state > 0 && setState(state - 1)}
							>
								<h4>BACK</h4>
							</button>
							<button
								className="continue-button"
								disabled={state === 2 && (selectedMethod || selectedShipping)}
								onClick={() => {
									if (state < 2 && (selectedMethod || selectedShipping)) {
										setState(state + 1);
									}
								}}
							>
								<h4>CONTINUE</h4>
							</button>
						</div>
					)}
				</div>
				{state !== 2 && (
					<div className="six wide column">
						<OrderSummary state={0} />
					</div>
				)}
			</div>
			{state === 2 && (
				<div className="confirm-container">
					<h2>3. ORDER SUMMARY</h2>
					<OrderSummary state={1} />
					<div className="delivery-button">
						<button
							className="back-button"
							disabled={state === 0}
							onClick={() => state > 0 && setState(state - 1)}
						>
							<h4>BACK</h4>
						</button>
						<button
							className="continue-button"
							onClick={() => {
								if (state < 2 && (selectedMethod || selectedShipping)) {
									setState(state + 1);
								} else if (state === 2) {
									console.log(cartList);
									dispatch(
										addToOrderHistory({
											orderItems: cartList,
											deliveredBy: deliveryDate,
											paymentOption: selectedMethod,
											totalBeforeTax,
											tax,
											orderTotal,
											shippingFee,
										})
									);
									setTimeout(3000);
								}
							}}
						>
							{state !== 2 ? (
								<h4>CONTINUE</h4>
							) : (
								<Link to="/placeorder">
									<h4>PLACE ORDER</h4>
								</Link>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Payment;
