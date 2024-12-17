import React from 'react';
import "./Payment.css";

const Payment = () => {
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
				<div className="step">
					<i className="truck icon"></i>
					<div className="content">
						<div className="title">Shipping</div>
						<div className="description">Choose your shipping options</div>
					</div>
				</div>
				<div className="active step">
					<i className="payment icon"></i>
					<div className="content">
						<div className="title">Billing</div>
						<div className="description">Enter billing information</div>
					</div>
				</div>
				<div className="disabled step">
					<i className="info icon"></i>
					<div className="content">
						<div className="title">Confirm Order</div>
					</div>
				</div>
			</div>
			<div className="shipping-content"></div>
		</div>
	);
};

export default Payment;
