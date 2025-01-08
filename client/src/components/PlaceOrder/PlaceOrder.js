import React, { useEffect } from "react";
import "./PlaceOrder.css";
import OrderHistoryDetail from "../OrderHistory/OrderHistoryDetail";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../actions/orderHistoryAction";
import { removeAllFromCart } from "../../actions/cartAction";
import { useParams } from "react-router-dom";

const PlaceOrder = () => {
	const dispatch = useDispatch();
	const { orderId } = useParams();
	const orderHistory = useSelector(state => state.orderHistory);

	useEffect(() => {
		dispatch(getOrderHistory(orderId));
		dispatch(removeAllFromCart());
	}, [dispatch, orderId]);

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
