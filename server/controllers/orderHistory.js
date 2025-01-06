import OrderHistory from "../models/orderHistoryModel.js";

export const fetchAllOrderHistory = async (req, res) => {
	try {
		const orderHistory = await OrderHistory.find({ user: req.user._id }).sort({
			orderDate: -1,
		});
		console.log(orderHistory);
		res.status(200).json(orderHistory);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const fetchLatestOrder = async (req, res) => {
	console.log(req.user._id);
	try {
		const orderHistory = await OrderHistory.findOne({ user: req.user._id });
		console.log("ORDER HISTORY", orderHistory);
		res.status(200).json(orderHistory);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getOrderHistory = async (req, res) => {
	console.log(req.params.id);
	try {
		const orderHistory = await OrderHistory.findOne({
			_id: req.params.id,
		});
		res.status(200).json(orderHistory);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const addToOrderHistory = async (req, res) => {
	const orderNumber = Date.now() + "-" + Math.floor(Math.random() * 1000);
	console.log(req.body.orderItems);

	const orderHistory = {
		user: req.user._id,
		dateOfOrder: new Date(),
		orderNumber,
		orderStatus: "Processing",
		deliveredBy: req.body.deliveredBy,
		orderItems: req.body.orderItems,
		paymentOption: req.body.paymentOption,
		totalBeforeTax: req.body.totalBeforeTax,
		tax: req.body.tax,
		coupon: 0,
		shippingFee: req.body.shippingFee,
		orderTotal: req.body.orderTotal,
	};
	console.log("ADD TO HISTORY: ", orderHistory);

	const newOrderHistory = new OrderHistory(orderHistory);
	console.log("NEW ORDER HISTORY: ", newOrderHistory);
	try {
		await newOrderHistory.save();
		res
			.status(201)
			.json({ message: "Add new order sucessfully!", data: newOrderHistory });
	} catch (error) {
		res.status(409).json({ message: error });
	}
};
