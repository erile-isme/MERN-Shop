import React, { useEffect } from "react";
import "./OrderHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderHistory } from "../../actions/orderHistoryAction";

const OrderHistory = ({ setState, setOrderHistoryId }) => {
	const dispatch = useDispatch();
	const orderHistory = useSelector(state => state.orderHistory);
	console.log(orderHistory);

	useEffect(() => {
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
						<>
							<div className="history-title">
								<h3>DATE OF ORDER {order.dateOfOrder}</h3>
								<div
									className="details-button"
									onClick={() => {
										setOrderHistoryId(order._id);
										setState("Order History Detail");
									}}
								>
									<h4>DETAILS</h4>
								</div>
							</div>
							<span>
								<p>Order Number: {order.orderNumber}</p>
								<p>Order status: {order.orderStatus}</p>
								<p>Estimated delivery time: {order.deliveredBy}</p>
							</span>
						</>
					))}
			</div>
		</div>
	);
};

export default OrderHistory;
