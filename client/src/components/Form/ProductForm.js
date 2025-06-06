import React, { useState, useEffect } from 'react';
import {
	TextField,
	Button,
	Typography,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	Paper,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, uploadPhotos } from "../../actions/productAction";
import "./styles.css";

const ProductForm = ({ currId, setCurrId }) => {
	const obj = {
		name: "",
		price: "",
		category: "",
		description: "",
		img: [],
		numInStock: "",
		isSlider: false,
		isDisplayCate: false,
		value: 0,
	};
	const [prodData, setProdData] = useState(obj);
	const [fileList, setFileList] = useState([]);
	const dispatch = useDispatch();
	const product = useSelector(state =>
		currId ? state.products.find(p => p._id === currId) : null
	); //fetch data (current post) from redux
	const categories = useSelector(state => state.categories);

	useEffect(() => {
		if (product) setProdData(product);
	}, [product]);

	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData();
		console.log(Array.from(fileList));
		Array.from(fileList).forEach(file => formData.append("image", file));
		dispatch(uploadPhotos(formData));
		if (
			prodData.name !== "" &&
			prodData.price !== "" &&
			prodData.category !== "" &&
			prodData.description !== "" &&
			prodData.img !== "" &&
			prodData.numInStock !== ""
		) {
			dispatch(createProduct(prodData));
		}
		console.error("Please fill out all information.");
		clear();
	};

	const clear = () => {
		setCurrId(null);
		setProdData(obj);
	};

	return (
		<div>
			<Paper className="paper">
				<form
					autoComplete="off"
					noValidate
					className="root form"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
				>
					<Typography variant="h6">Adding a Product</Typography>
					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={prodData.name}
						required={true}
						onChange={e => {
							setProdData({ ...prodData, name: e.target.value });
						}}
					/>

					<TextField
						name="price"
						variant="outlined"
						label="Price"
						fullWidth
						required={true}
						value={prodData.price}
						onChange={e => {
							setProdData({ ...prodData, price: e.target.value });
						}}
					/>

					<FormControl variant="outlined" required fullWidth>
						<InputLabel id="category">Category</InputLabel>

						<Select
							labelId="category"
							id="select"
							label="Category"
							fullWidth
							value={prodData.category}
							onChange={e => {
								setProdData({ ...prodData, category: e.target.value });
							}}
						>
							{/* CHANGE VALUE FOR CATEGORIES LATER */}

							{categories.map(cate => (
								<MenuItem key={cate.name} value={cate.value}>
									{cate.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TextField
						name="descriptions"
						variant="outlined"
						label="Descriptions"
						fullWidth
						required={true}
						value={prodData.description}
						onChange={e => {
							setProdData({
								...prodData,

								description: e.target.value,
							});
						}}
					/>

					<TextField
						name="numInStock"
						variant="outlined"
						label="Number In Stock"
						fullWidth
						required={true}
						value={prodData.numInStock}
						onChange={e => {
							setProdData({
								...prodData,

								numInStock: e.target.value,
							});
						}}
					/>

					<div className="slider">
						<FormControlLabel
							label="Feature on Slider"
							control={
								<Checkbox
									onChange={e => {
										setProdData({
											...prodData,

											isSlider: e.target.checked,
										});
									}}
								/>
							}
							labelPlacement="start"
						/>
					</div>
					<div className="fileInput">
						<input
							type="file"
							name="images"
							accept="image/*"
							multiple
							onChange={e => setFileList(e.target.files)}
							className="file-upload-input"
						/>
					</div>
					<Button
						className="buttonSubmit"
						variant="contained"
						color="primary"
						size="large"
						type="submit"
						fullWidth
					>
						Submit
					</Button>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={clear}
						fullWidth
					>
						Clear
					</Button>
				</form>
			</Paper>
		</div>
	);
};

export default ProductForm;
