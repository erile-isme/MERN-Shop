import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../actions/userAction";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
// import { gapi } from "gapi-script";
// import { GoogleLogin } from "@react-oauth/google";
// import Icon from './icon';
// import Input from "./Input";
// import { signup, signin } from '../../actions/auth';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [confirmPass, setConfirmPass] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		address: "",
		postalCode: "",
		phone: "",
		termAgreement: false,
	});

	const user = useSelector(state => state.user);
	const error = useSelector(state => state.user.error);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (user.isAuthenticated) {
			localStorage.setItem("token", user.token);
			localStorage.setItem("tokenExpiration", Date.now() + 60 * 60 * 1000); //Token valid for 1 hour
			const redirectUrl =
				new URLSearchParams(location.search).get("redirect") || "/";
			navigate(redirectUrl, { replace: true });
			window.location.reload();
		} else if (user.isRegistered && !user.isAuthenticated) {
			alert("Registered successfully");
			setIsSignUp(false);
		}
	}, [user, navigate, location]);

	// useEffect(() => {
	// 	gapi.load("client:auth2", () =>
	// 		gapi.auth2.init({ clientId: process.env.CLIENT_ID, scope: "" })
	// 	);
	// }, []);

	const handleFormSubmit = e => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(registerUser(formData));
		} else {
			dispatch(loginUser(formData));
		}
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			address: "",
			postalCode: "",
			phone: "",
			termAgreement: false,
		});
		setConfirmPass("");
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleConfirmPass = e => {
		setConfirmPass(e.target.value);
		if (confirmPass !== formData.password) {
			console.error("Password are not the same!");
		}
	};

	const switchMode = () => {
		setIsSignUp(prevSignUp => !prevSignUp);
		setShowPassword(false);
	};

	// const googleSuccess = async (res) => {
	//   const result = res?.profileObj; //with ?, even though it's null, it won't through error -> unidentified
	//   const token = res?.tokenId;

	//   try {
	//     dispatch({
	//       type: 'AUTH',
	//       data: { result, token },
	//     });
	//     history.push('/');
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };
	// const googleFailure = (error) => {
	//   console.log(error);
	//   console.log('Google Sign In was unsuccesfully. Try Again Later.');
	// };

	return (
		<div className="ui container login-container">
			<h1>{isSignUp ? "SIGN UP" : "LOGIN"}</h1>
			<p>Log in with your email and password</p>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form className="ui form login-form" onSubmit={handleFormSubmit}>
				{isSignUp && (
					<React.Fragment>
						<div className="ui input">
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								placeholder="First Name"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="ui input">
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								placeholder="Last Name"
								onChange={handleChange}
								required
							/>
						</div>
					</React.Fragment>
				)}
				<div className="ui input">
					<input
						type="email"
						name="email"
						value={formData.email}
						placeholder="E-mail Address"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="ui input">
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				{isSignUp && (
					<React.Fragment>
						<div className="ui input">
							<input
								type="password"
								name="confirmPassword"
								value={confirmPass}
								placeholder="Repeat Password"
								onChange={handleConfirmPass}
								required
							/>
						</div>
						<div className="ui input">
							<input
								type="text"
								name="address"
								value={formData.address}
								placeholder="Address"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="ui input">
							<input
								type="text"
								name="postalCode"
								value={formData.postalCode}
								placeholder="Postal Code"
								onChange={handleChange}
							/>
						</div>
						<div className="ui input">
							<input
								type="text"
								name="phone"
								value={formData.phone}
								placeholder="Phone Number (e.g. (555) 555-5555)"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="ui divider"></div>
						<div>
							<h2>MEMBERSHIP AGREEMENT</h2>
							<p>
								By creating an account, you agree to eri's privacy policy and
								terms of use.
							</p>
							<div className="ui checkbox">
								<input
									type="checkbox"
									name="termAgreement"
									required
									onChange={e =>
										setFormData({
											...formData,
											termAgreement: e.target.checked,
										})
									}
								/>
								<label>I agree to eri's TERMS OF USE and PRIVACY POLICY</label>
							</div>
						</div>
					</React.Fragment>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className="submit"
					disabled={isSignUp && !formData.termAgreement}
				>
					{isSignUp ? "Sign Up" : "Sign In"}
				</Button>

				{/* <Button>
					<GoogleLogin
						onSuccess={console.log("Login successfully")}
						onFailure={console.log("Login failed")}
						cookiePolicy={"single_host_origin"}
					/>
				</Button> */}
				<Button onClick={switchMode}>
					{isSignUp
						? "Already have an account? Sign In"
						: "Don't have an account? Sign Up"}
				</Button>
			</form>
		</div>
	);
};

export default Login;
