import React, { useEffect } from "react";
import "./OrderHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderHistory } from "../../actions/orderHistoryAction";
import { Link } from "react-router-dom";

const OrderHistory = () => {
	const dispatch = useDispatch();
	const orderHistory = useSelector(state => state.orderHistory);
	console.log(orderHistory);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchAllOrderHistory());
	}, [dispatch]);

	return (
		<div className="ui container orderhistory-container">
			<div className="orderhistory-title">
				<h2>ORDER HISTORY</h2>
				<h3>You can find all of your order history here.</h3>
			</div>
			<div className="ui divider"></div>
			<div className="order-history">
				{orderHistory &&
					orderHistory.length > 0 &&
					orderHistory.map(order => (
						<div key={order._id}>
							<div className="history-title">
								<h3>DATE OF ORDER {order.dateOfOrder}</h3>
								<div className="details-button">
									<Link to={`/account/orderhistory/${order._id.toString()}`}>
										Details
									</Link>
								</div>
							</div>
							<span>
								<p>Order Number: {order.orderNumber}</p>
								<p>Order status: {order.orderStatus}</p>
								<p>Estimated delivery time: {order.deliveredBy}</p>
							</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default OrderHistory;
