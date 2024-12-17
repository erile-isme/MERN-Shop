import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const fetchAllProducts = async (req, res) => {
	try {
		const product = await Product.find().populate("category");
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

const generateToken = id => {
	return jwt.sign(
		{
			id,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);
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
	const { firstName, lastName, email, password, termAgreement } = req.body;
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
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: hashedPass,
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

export const getMe = async (req, res) => {
	res.status(200).json({ message: "User Data Display" });
};
