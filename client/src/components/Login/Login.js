import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { gapi } from "gapi-script";
// import { GoogleLogin } from "@react-oauth/google";
// import Icon from './icon';
// import Input from "./Input";
import "./Login.css";
import { loginUser, registerUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
// import { signup, signin } from '../../actions/auth';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [confirmPass, setConfirmPass] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		termAgreement: false,
	});
	const user = useSelector(state => state.user);
	const error = useSelector(state => state.user.error);
	console.log("USER: ", user);
	console.log("USER: ", error);

	useEffect(() => {
		if (user.isAuthenticated) {
			alert("Login successfully");
			navigate("/", { replace: true });
		} else if (user.isRegistered && !user.isAuthenticated) {
			alert("Registered successfully");
			setIsSignUp(false);
		}
	}, [user, navigate]);

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
			console.log("Password are not the same!");
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
											termAgreement: e.target.value === "on" ? true : false,
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
