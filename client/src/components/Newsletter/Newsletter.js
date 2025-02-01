import React, { useEffect, useRef, useState } from "react";
import { errorMessage } from "../../shared/tools";
import emailjs from "emailjs-com";
import "./Newsletter.css";
import { ToastContainer } from "react-toastify";

const Newsletter = () => {
	const form = useRef();
	const [emailSent, setEmailSent] = useState(false);

	const onSendEmail = e => {
		e.preventDefault();

		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICE_ID,
				process.env.REACT_APP_TEMPLATE_ID,
				form.current,
				process.env.REACT_APP_EMAIL_PUBLIC_KEY
			)
			.then(
				result => {
					console.log("Success:", result);
					setEmailSent(true);
				},
				error => {
					console.error("Error:", error);
					errorMessage("Error!");
				}
			);

		e.target.reset();
	};

	useEffect(() => {
		setTimeout(() => setEmailSent(false), 5000);
	}, [emailSent]);

	return (
		<div className="newsletter-container">
			<ToastContainer />
			<div className="newsletter-body">
				<div className="newsletter-title">Newsletter.</div>
				<div className="newsletter-description">
					Subscribe to our newsletter to receive the latest news and get 10% OFF
					for the first order.
				</div>
				<form ref={form} onSubmit={onSendEmail} className="newsletter-email">
					<input
						className="newsletter-input"
						name="email"
						type="email"
						placeholder="Type your email here"
					/>
					<input
						className="ui inverted secondary button"
						type="submit"
						value={`${emailSent ? "Sent" : "Email us"}`}
					/>
				</form>
			</div>
		</div>
	);
};

export default Newsletter;
