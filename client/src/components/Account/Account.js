import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";
import OrderHistory from "../OrderHistory/OrderHistory";
import OrderHistoryDetail from "../OrderHistory/OrderHistoryDetail";
import { getOrderHistory } from "../../actions/orderHistoryAction";

const Account = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState("Profile");
	const [orderHistoryId, setOrderHistoryId] = useState("");
	const currentUser = useSelector(state => state.user);
	console.log(currentUser);
	const orderHistorySelected = useSelector(state => state.orderHistory);
	console.log(orderHistorySelected);

	useEffect(() => {
		dispatch(getUser());
		if (state === "Order History Detail")
			dispatch(getOrderHistory(orderHistoryId));
	}, [dispatch, state, orderHistoryId]);

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
							Profile
						</div>
						<div
							className={`${state === "Order History" ? "active" : ""} item`}
							onClick={() => setState("Order History")}
						>
							Order History
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
					</div>
				</div>
				<div className="eleven wide column">
					{state === "Profile" && (
						<div className="account-profile">
							<h2>PROFILE</h2>
							<div className="personal-info">
								<h3>Name</h3>
								<p>{currentUser.name}</p>
								<h3>Email Address</h3>
								<p>{currentUser.email}</p>
							</div>
						</div>
					)}
					{state === "Order History" && (
						<OrderHistory
							setState={setState}
							setOrderHistoryId={setOrderHistoryId}
						/>
					)}
					{state === "Order History Detail" && (
						<OrderHistoryDetail orderHistory={orderHistorySelected} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Account;
