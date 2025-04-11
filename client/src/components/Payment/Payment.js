import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToOrderHistory } from "../../actions/orderHistoryAction";
import { fetchCart } from "../../actions/cartAction";
import { getUser } from "../../actions/userAction";
import { useOrder } from "../OrderSummary/OrderProvider";
import Loading from "../Loading/Loading";
import OrderSummary from "../OrderSummary/OrderSummary";
import "./Payment.css";
import ProductBand from "../Product/ProductBand";
import { errorMessage } from "../../shared/tools";
import { ToastContainer } from "react-toastify";

const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [state, setState] = useState(0);
	const [selectedMethod, setSelectedMethod] = useState("Credit Card");
	const [selectedShipping, setSelectedShipping] = useState("ship");
	const [isLoading, setIsLoading] = useState(false);
	const [orderPlaced, setOrderPlaced] = useState(false);

	const [city, setCity] = useState("");
	const [store, setStore] = useState(false);
	const [storeLocation, setStoreLocation] = useState("");
	const [selectStore, setSelectStore] = useState(false);

	const { totalBeforeTax, tax, orderTotal, shippingFee } = useOrder();

	const cartList = useSelector(state => state.cart);
	const currUser = useSelector(state => state.user.user);
	const orderHistory = useSelector(state => state.orderHistory);

	//Create estimated delivery date
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

	//Handle place order and navigate to Place Order Confirmation page in useEffect
	const handlePlaceOrder = async () => {
		setIsLoading(true);
		const storeAddress = selectedShipping === "ship" ? null : storeLocation;

		dispatch(
			addToOrderHistory({
				orderItems: cartList,
				deliveredBy: deliveryDate,
				paymentOption: selectedMethod,
				totalBeforeTax,
				tax,
				orderTotal,
				shippingMethod: selectedShipping,
				storeLocation: storeAddress,
				shippingFee,
			})
		);
		setOrderPlaced(true);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchCart());
		dispatch(getUser());
		if (orderPlaced && orderHistory?.newOrderHistory) {
			setIsLoading(false);
			navigate(`/placeorder/${orderHistory.newOrderHistory._id.toString()}`);
		}
	}, [dispatch, navigate, orderPlaced, orderHistory]);

	return (
		<div className="ui container checkout-container">
			{/* Breadccrumbs for UX */}
			<ToastContainer />
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
			{/* Delivery steps */}
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
					{/* Confirm delivery option and address */}
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
										<p>
											Expected Deliver:{" "}
											{selectedShipping === "ship" ? deliveryDate : "Estimate"}
										</p>
									</div>
								</div>
								<div className="input-radios">
									<input
										type="radio"
										name="shippingAddress"
										id="pickup"
										value="pickup"
										checked={selectedShipping === "pickup"}
										onChange={e => {
											setSelectedShipping(e.target.value);
										}}
									/>
									<div>
										<h4>Pick up</h4>
										<p>
											Available Pickup:{" "}
											{selectedShipping === "pickup" && store
												? deliveryDate
												: "Estimated"}
										</p>
									</div>
								</div>
								{selectedShipping === "pickup" && (
									<div>
										<div className="ui divider"></div>
										<div className="find-store">
											<h2>FIND A STORE</h2>
											<div>
												<h3>CITY LOCATION</h3>
												<div className="city-location">
													<input
														type="text"
														placeholder="Your city"
														required
														onClick={() => setStore(false)}
														onChange={e => setCity(e.target.value)}
													/>
													<div
														className="find-button"
														onClick={() => {
															if (store !== "") setStore(true);
															else errorMessage("Please enter the city name!");
														}}
													>
														Find a store
													</div>
												</div>
											</div>
											{store && (
												<div className="ui grid store-location">
													<div className="twelve wide column">
														<h3>STORE A</h3>
														<p>Shopping Center A, 234 Abc Street, {city}</p>
														<h3>STORE HOURS</h3>
														<pre>
															Mon 9:00AM - 8:00PM <br />
															Tue 9:00AM - 8:00PM <br />
															Wed 9:00AM - 8:00PM <br />
															Thu 9:00AM - 8:00PM <br />
															Fri 9:00AM - 8:00PM <br />
															Sat 9:00AM - 8:00PM <br />
															Sun 9:00AM - 6:00PM
														</pre>
													</div>
													<div className="four wide column">
														<div
															className={`select-button ${
																selectStore ? "active" : ""
															}`}
															onClick={() => {
																setStoreLocation(
																	`Store A, Shopping Center A, 234 Abc Street, ${city}`
																);
																setSelectStore(true);
															}}
														>
															{selectStore ? "Selected" : "Select"}
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								)}
							</div>
							<div className="ui divider"></div>
							{currUser && (
								<div className="delivery-address">
									<h2>SHIPPING ADDRESS</h2>
									<div className="ui grid">
										<div className="three wide column">
											<p>{currUser.name}</p>
										</div>
										<div className="nine wide column">
											<p>{currUser.address}</p>
											<p>{currUser.postalCode}</p>
											<p>{currUser.phone}</p>
										</div>
										<div className="three wide column">
											<div
												className={`select-button active`}
												onClick={() => {
													// setSelectStore(true);
												}}
											>
												Selected
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
					{/* Confirm purchased items and payment options */}
					{state === 1 && (
						<div className="payment-container">
							<div className="order-details">
								<h2>ORDER ITEM(S)</h2>
								<div className="ui divider"></div>
								{cartList &&
									cartList.length > 0 &&
									cartList.map(item => (
										<ProductBand key={item._id} product={item} />
									))}
							</div>
							<div className="payment-content">
								<h2>2. PAYMENT OPTION</h2>
								<p>
									Please select your payment option. Disclaimer: This is for
									display purpose only. No bank card should be entered in this
									section.
								</p>
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
											onChange={e => setSelectedMethod(e.target.value)}
										/>
										PayPal
									</div>
								</div>
							</div>
						</div>
					)}
					{/* Back and Continue button are different for state 0 and 1 comparing with state 2 */}
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
				{/* Display Order Summary throughout state 0 and 1. State 2 will expand the whole width without ui grid */}
				{state !== 2 && (
					<div className="six wide column">
						<OrderSummary
							paymentState={0}
							selectedShipping={selectedShipping}
						/>
					</div>
				)}
			</div>
			{/* Confirm order before paying */}
			{state === 2 && (
				<div className="confirm-container">
					<h2>3. ORDER SUMMARY</h2>
					<OrderSummary paymentState={1} selectedShipping={selectedShipping} />
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
								if (state < 2 && (selectedMethod || selectedShipping))
									setState(state + 1);
								else if (state === 2) handlePlaceOrder();
							}}
						>
							{state !== 2 ? <h4>CONTINUE</h4> : <h4>PLACE ORDER</h4>}
						</button>
					</div>
				</div>
			)}
			<Loading show={isLoading} />
		</div>
	);
};

export default Payment;
