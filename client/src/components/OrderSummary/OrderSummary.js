import React, { useEffect } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import { TAX } from "../../shared/actionTypes";
import { Link } from "react-router-dom";
import { useOrder } from "./OrderProvider";
import "./OrderSummary.css";

const OrderSummary = ({ paymentState, selectedShipping, cartUpdated }) => {
	const dispatch = useDispatch();
	const {
		totalBeforeTax,
		setTotalBeforeTax,
		tax,
		setTax,
		orderTotal,
		setOrderTotal,
		shippingFee,
		setShippingFee,
	} = useOrder();

	const cartList = useSelector(state => state.cart);

	const calculateOrder = () => {
		let total = 0;
		cartList.forEach(item => (total += item.price * item.quantity));

		const totalBeforeTax = Math.round(total * 100) / 100;
		setTotalBeforeTax(totalBeforeTax);

		const tax = totalBeforeTax * TAX;
		setTax(Math.round(tax * 100) / 100);

		const ship =
			paymentState === 0 || selectedShipping === "pickup"
				? 0
				: Math.round(Math.random() * 10 * 100) / 100;
		setShippingFee(ship);

		const orderTotal = Math.round((totalBeforeTax + tax + ship) * 100) / 100;
		setOrderTotal(orderTotal);
	};

	/*
	 * state 0: From Payment for delivery and billing or Cart for cart update - calculate Order except shipping until knowing shipping method
	 * state 1: From Payment for confirm order - recalculate with shipping fee
	 */
	useEffect(() => {
		if (paymentState === 0 || cartUpdated) {
			dispatch(fetchCart()).then(() => {
				calculateOrder();
			});
		}
	}, [dispatch, paymentState, cartUpdated]);

	return (
		<>
			<div className="total-summary">
				<table className="summary-table">
					<thead>
						<tr>
							<th colSpan="2" className="summary-title">
								<h3>Order Summary | {cartList.length} ITEMS</h3>
								<Link to="/cart">
									<h3>EDIT</h3>
								</Link>
							</th>
							<th colSpan="1" className="summary-title"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<p>Item(s) subtotal</p>
							</td>
							<td className="value">
								<p>CAD ${totalBeforeTax}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Shipping</p>
							</td>
							<td className="value">
								<p>
									{paymentState === 0
										? "Estimated later"
										: `CAD ${shippingFee}`}
								</p>
							</td>
						</tr>
						{window.location.pathname === "/payment" && (
							<tr>
								<td>
									<div className="ui divider"></div>
								</td>
								<td className="value">
									<div className="ui divider"></div>
								</td>
							</tr>
						)}
						<tr>
							<td>
								<h4>SUBTOTAL</h4>
							</td>
							<td className="value">
								<h4>CAD ${totalBeforeTax}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<p>Estimated Tax</p>
							</td>
							<td className="value">
								<p>CAD ${tax}</p>
							</td>
						</tr>
						{window.location.pathname === "/payment" && (
							<tr>
								<td>
									<div className="ui divider"></div>
								</td>
								<td className="value">
									<div className="ui divider"></div>
								</td>
							</tr>
						)}
						<tr>
							<td>
								<h3>ORDER TOTAL</h3>
							</td>
							<td className="value ordertotal">
								<h3>CAD ${orderTotal}</h3>
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
		</>
	);
};
export default OrderSummary;
