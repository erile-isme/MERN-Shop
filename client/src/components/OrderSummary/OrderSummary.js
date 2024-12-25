import React, { useEffect } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import "./OrderSummary.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import { TAX } from "../../constants/actionTypes";
import { Link } from "react-router-dom";

const OrderSummary = () => {
	const dispatch = useDispatch();
	const calculateTotal = () => {
		let total = 0;
		cartList.map(item => (total += item.price * item.quantity));
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

	return (
		<div>
			<div className="total-summary">
				<table className="summary-table">
					<thead>
						<tr>
							<th colSpan="1" className="summary-title">
								<h3>Order Summary | {cartList.length} ITEMS</h3>
							</th>
							<th colSpan="1" className="summary-title">
								<Link to="/cart">
									<h3>EDIT</h3>
								</Link>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<p>Item(s) subtotal</p>
							</td>
							<td className="value">
								<p>CAD ${calculateTotal()}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Shipping</p>
							</td>
							<td className="value">
								<p>CAD $0</p>
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
								<h4>CAD ${calculateTotal()}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<p>Estimated Tax</p>
							</td>
							<td className="value">
								<p>CAD ${calculateTax()}</p>
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
							<td className="value">
								<h3>
									CAD $
									{Math.round((calculateTax() + calculateTotal()) * 100) / 100}
								</h3>
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
		</div>
	);
};

export default OrderSummary;
