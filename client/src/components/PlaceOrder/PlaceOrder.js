import React, { useEffect } from "react";
import "./PlaceOrder.css";
import OrderHistoryDetail from "../OrderHistory/OrderHistoryDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestOrder } from "../../actions/orderHistoryAction";
import { removeAllFromCart } from "../../actions/cartAction";

const PlaceOrder = () => {
	const dispatch = useDispatch();
	const orderHistory = useSelector(state => state.orderHistory);
	console.log(orderHistory);

	useEffect(() => {
		dispatch(fetchLatestOrder());
		// dispatch(removeAllFromCart());
	}, [dispatch]);

	return (
		orderHistory && (
			<div className="ui container orderplace-container">
				<div className="order-title">
					<h2>ORDER PLACED SUCCESSFULLY</h2>
					<h3>Thank you for ordering from us!</h3>
				</div>
				<div className="order-detail">
					<OrderHistoryDetail orderHistory={orderHistory} />
				</div>
			</div>
		)
	);
};

export default PlaceOrder;
