import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";
import Loading from "../Loading/Loading";

const Profile = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		if (!user) dispatch(getUser());
	}, [dispatch, user]);

	return user ? (
		<div className="account-profile">
			<h2>PROFILE</h2>
			<div className="personal-info">
				<h3>Name</h3>
				<p>{user.name}</p>
				<h3>Email Address</h3>
				<p>{user.email}</p>
				<h3>Shipping Address</h3>
				<p>
					{user.address}, {user.postalCode}
				</p>
				<h3>Phone Number</h3>
				<p>{user.phone}</p>
			</div>
		</div>
	) : (
		<Loading show={true} />
	);
};

export default Profile;
