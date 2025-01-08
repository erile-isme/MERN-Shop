import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const generateToken = id => {
	return jwt.sign(
		{
			id,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);
};

export const getUser = async (req, res) => {
	const currentUser = req.user;
	const user = {
		id: currentUser._id,
		name: currentUser.firstName + " " + currentUser.lastName,
		email: currentUser.email,
		address: currentUser.address,
		postalCode: currentUser.postalCode,
		phone: currentUser.phone,
	};
	console.log(user);
	res
		.status(200)
		.json({
			sucess: true,
			message: "Retrieve user info successfully",
			data: user,
		});
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const exisitingUser = await User.findOne({
		email: email,
	});

	console.log(exisitingUser);

	if (
		exisitingUser &&
		(await bcrypt.compare(password, exisitingUser.password))
	) {
		res.status(200).json({
			message: "Login successfully",
			token: generateToken(exisitingUser._id),
		});
	} else {
		res.status(401).json({
			message: "Please check your email or password again.",
		});
	}
};

export const registerUser = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password,
		termAgreement,
		address,
		postalCode,
		phone,
	} = req.body;
	try {
		const exisitingUser = await User.findOne({
			email: email,
		});

		console.log(exisitingUser);

		if (exisitingUser) {
			res.status(400).json({
				message: "User already exists",
				userAdded: false,
			});
		} else {
			//Hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPass = await bcrypt.hash(password, salt);

			//Create user
			const newUser = new User({
				firstName,
				lastName,
				email,
				password: hashedPass,
				address,
				postalCode,
				phone,
				termAgreement: termAgreement,
			});
			console.log("NEWUSER: ", newUser);
			await newUser.save();

			res.status(201).json({
				message: "Added user successfully",
				userAdded: true,
				token: generateToken(newUser._id),
			});
		}
	} catch (error) {
		res.status(401).json({
			message: "Error while creating new user",
			userAdded: false,
		});
	}
};
