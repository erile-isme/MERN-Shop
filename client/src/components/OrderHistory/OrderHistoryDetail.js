import React, { useEffect } from "react";
import "./OrderHistoryDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";
import { useParams } from "react-router-dom";
import { getOrderHistory } from "../../actions/orderHistoryAction";

const OrderHistoryDetail = () => {
	const dispatch = useDispatch();
	const { orderHistoryId } = useParams();
	const currUser = useSelector(state => state.user.user);
	const orderHistory = useSelector(state => state.orderHistory);

	useEffect(() => {
		dispatch(getUser());
		if (orderHistoryId) dispatch(getOrderHistory(orderHistoryId));
	}, [dispatch, orderHistoryId]);

	return (
		orderHistory &&
		orderHistory.length > 0 &&
		orderHistory.map(order => (
			<div className="historydetail-container">
				<h2>ORDER HISTORY DETAILS</h2>
				<div className="orderhistory-details">
					<h3>DATE OF ORDER: {order.dateOfOrder}</h3>
					<p>Order number #: {order.orderNumber}</p>
					<p>Order Status: {order.orderStatus}</p>
					<p>Delivered By: {order.deliveredBy}</p>
					<p>Shipping fee: CAD ${order.shippingFee}</p>
					<p></p>
				</div>
				<div className="ui divider"></div>
				<div className="coupon">
					<h3>COUPON</h3>
					<p>Coupon type:</p>
					<p>Coupon value: ${order.coupon}</p>
				</div>
				<div className="ui divider"></div>
				<div className="shipping-details">
					<h3>SHIPPING ADDRESS</h3>
					<p>Name: {currUser.name}</p>
					<p>
						Shipping Address: {currUser.address} {currUser.postalCode}
					</p>
					<p>Phone Number: {currUser.phone}</p>
				</div>
				<div className="ui divider"></div>
				<div className="payment-details">
					<h3>PAYMENT OPTION</h3>
					<p>{order.paymentOption}</p>
				</div>
				<div className="ui divider"></div>
				<div className="ordersummary-details">
					<h3>ORDER SUMMARY</h3>
					{order.orderItems &&
						order.orderItems.length > 0 &&
						order.orderItems.map((item, index) => (
							<div key={index}>
								<div className="ui grid">
									<div className="three wide column">
										<img
											className="cart-img"
											src={`${
												process.env.REACT_APP_PROD
											}/uploads/${item.img.replace("resources/", "")}`}
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
											<h4>CAD $ {item.price}</h4>
											<h3>Subtotal: CAD ${item.price}</h3>
										</div>
									</div>
								</div>
							</div>
						))}
					<div className="ui divider"></div>
					<div>
						<table className="summary-table">
							<tbody>
								<tr>
									<td>
										<p>Item(s) subtotal</p>
									</td>
									<td className="value">
										<p>CAD ${order.totalBeforeTax}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>Coupon</p>
									</td>
									<td className="value">
										<p>CAD ${order.coupon}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>Shipping</p>
									</td>
									<td className="value">
										<p>CAD ${order.shippingFee}</p>
									</td>
								</tr>
								<tr>
									<td>
										<div className="ui divider"></div>
									</td>
									<td className="value">
										<div className="ui divider"></div>
									</td>
								</tr>
								<tr>
									<td>
										<h4>SUBTOTAL</h4>
									</td>
									<td className="value">
										<h4>CAD ${order.totalBeforeTax}</h4>
									</td>
								</tr>
								<tr>
									<td>
										<p>Estimated Tax</p>
									</td>
									<td className="value">
										<p>CAD ${order.tax}</p>
									</td>
								</tr>
								<tr>
									<td>
										<div className="ui divider"></div>
									</td>
									<td className="value">
										<div className="ui divider"></div>
									</td>
								</tr>
								<tr>
									<td>
										<h3>ORDER TOTAL</h3>
									</td>
									<td className="value">
										<h3>CAD ${order.orderTotal}</h3>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p>Item(s) sub total</p>
				</div>
			</div>
		))
	);
};

export default OrderHistoryDetail;
