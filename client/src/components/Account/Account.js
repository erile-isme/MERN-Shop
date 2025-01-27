import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Account.css";

const Account = () => {
	const navigate = useNavigate();
	const [state, setState] = useState("Profile");

	useEffect(() => {
		window.scrollTo(0, 0);
		const location = window.location.pathname.split("/")[2];
		if (location === "orderhistory") setState("Order History");
		else if (location === "wishlist") setState("Wish List");
	}, []);

	return (
		<div className="ui container account">
			<div className="ui breadcrumb">
				<a className="section" href="/">
					Home
				</a>
				<i className="right chevron icon divider"></i>
				<div className="section">Account</div>
				<i className="right chevron icon divider"></i>
				<div className="active section">{state}</div>
			</div>
			<div className="ui grid">
				<div className="four wide column">
					<h2>Account</h2>
					<div className="ui link list">
						<div
							className={`${state === "Profile" ? "active" : ""} item`}
							onClick={() => setState("Profile")}
						>
							<Link to="/account/profile">Profile</Link>
						</div>
						<div
							className={`${state === "Order History" ? "active" : ""} item`}
							onClick={() => {
								setState("Order History");
								navigate("/account/orderhistory");
							}}
						>
							Order History
						</div>
						<div
							className={`${state === "Wish List" ? "active" : ""} item`}
							onClick={() => {
								setState("Wish List");
								navigate("/account/wishlist");
							}}
						>
							Wish List
						</div>
					</div>
					<h2>Profile Setting</h2>
					<div className="ui link list">
						<div
							className={`${state === "Edit profile" ? "active" : ""} item`}
							onClick={() => setState("Edit profile")}
						>
							Edit profile
						</div>
						<div
							className={`${state === "Change passwords" ? "active" : ""} item`}
							onClick={() => setState("Change passwords")}
						>
							Change passwords
						</div>
						<div
							className={`${state === "Sign Out" ? "active" : ""} item`}
							onClick={() => {
								setState("Sign Out");
								localStorage.removeItem("token");
								localStorage.removeItem("tokenExpiration");
								navigate("/");
							}}
						>
							Sign Out
						</div>
					</div>
				</div>
				<div className="eleven wide column">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Account;
