import React, { useEffect } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";

const Account = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const currentUser = useSelector(state => state.user);
	console.log(currentUser);

	return (
		<div className="ui container account">
			<div className="ui breadcrumb">
				<a className="section" href="/">
					Home
				</a>
				<i className="right chevron icon divider"></i>
				<div className="section">Account</div>
				<i className="right chevron icon divider"></i>
				<div className="active section">Profile</div>
			</div>
			<div className="ui grid">
				<div className="four wide column">
					<h2>Account</h2>
					<div className="ui link list">
						<div className="active item">Profile</div>
					</div>
					<h2>Profile Setting</h2>
					<div className="ui link list">
						<div className="item">Edit profile</div>
						<div className="item">Change passwords</div>
					</div>
				</div>
				<div className="eleven wide column">
					<div className="account-profile">
						<h2>PROFILE</h2>
						<div className="personal-info">
							<h3>Name</h3>
							<p>{currentUser.name}</p>
							<h3>Email Address</h3>
							<p>{currentUser.email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
