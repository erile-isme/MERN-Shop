import React from "react";
import "./PlaceOrder.css";
import OrderHistory from "../OrderHistory/OrderHistoryDetail";

const PlaceOrder = () => {
	return (
		<div className="ui container orderplace-container">
			<div className="order-title">
				<h2>ORDER PLACED SUCCESSFULLY</h2>
				<h3>Thank you for ordering from us!</h3>
			</div>
			<div className="order-detail">
				<h2>ORDER HISTORY DETAILS</h2>
				<div className="">
					<OrderHistory />
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;
