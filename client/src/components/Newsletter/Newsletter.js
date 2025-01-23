import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Newsletter.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";

const Newsletter = () => {
	const form = useRef();
	const dispatch = useDispatch();
	const [emailSent, setEmailSent] = useState(false);
	const user = useSelector(state => state.user);

	const onSendEmail = e => {
		e.preventDefault();
		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICE_ID,
				process.env.REACT_APP_TEMPLATE_ID,
				form.current,
				process.env.REACT_APP_PUBLIC_KEY
			)
			.then(
				result => {
					console.log("Success:", result);
					setEmailSent(true);
				},
				error => {
					console.error("Error:", error);
				}
			);
		e.target.reset();
	};

	useEffect(() => {
		setTimeout(() => setEmailSent(false), 5000);
		if (localStorage.getItem("token")) dispatch(getUser());
	}, [dispatch]);

	return (
		<div>
			<div className="newsletter-container">
				<div className="newsletter-body">
					<div className="newsletter-title">Newsletter.</div>
					<div className="newsletter-description">
						Subscribe to our newsletter to receive the latest news and get 10%
						OFF for the first order.
					</div>
					<form ref={form} onSubmit={onSendEmail} className="newsletter-email">
						<input
							className="newsletter-input"
							name="email"
							type="email"
							placeholder="Type your email here"
						/>
						<input
							className="newsletter-input"
							name="name"
							type="text"
							value={user.user.name}
							hidden
						/>
						<input
							className="ui inverted secondary button"
							type="submit"
							value={`${emailSent ? "Registered" : "Email us"}`}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Newsletter;
