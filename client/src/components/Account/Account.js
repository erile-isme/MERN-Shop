import React from "react";
import "./Account.css";

const Account = () => {
	return (
		<div className="ui container account">
			<div className="ui breadcrumb">
				<a className="section" href="/">
					Home
				</a>
				<i className="right chevron icon divider"></i>
				<div className="section">Account</div>
				<div className="active section">Profile</div>
			</div>
			<div className="ui grid">
				<div className="three wide column">
					<h3>Account</h3>
					<div className="ui link list">
						<div className="active item">Profile</div>
					</div>
					<h3>Profile Setting</h3>
					<div className="ui link list">
						<div className="item">Edit profile</div>
						<div className="item">Change passwords</div>
					</div>
				</div>
				<div className="eleven wide column">
					<div className="account-profile"></div>
				</div>
			</div>
		</div>
	);
};

export default Account;
