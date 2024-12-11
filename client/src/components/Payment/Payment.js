import React from 'react';

const Payment = () => {
	return (
		<div>
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
		</div>
	);
};

export default Payment;
