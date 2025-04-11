import React, { useEffect, useState } from 'react'
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import ProductCard from '../Product/ProductCard';
import "./ProductFilter.css"

const ProductFilter = ({ allProducts }) => {
    const [filterProducts, setFilterProducts] = useState(allProducts);

	const prodPrices = [
		"Less Than $15",
		"$15 - $50",
		"$50 - $100",
		"$100 - $150",
		"$150 - $200",
		"Over $200",
	];
	const prodSizes = [...new Set(allProducts?.map(item => item.size).flat())];
	const prodCategories = [
		...new Set(allProducts?.map(item => item.category.name).flat()),
	];

	const [price, setPrice] = useState([]);
	const [size, setSize] = useState([]);
    const [category, setCategory] = useState([]);
    
    useEffect(() => {
        setFilterProducts(allProducts)
    }, [allProducts])
    
    /** Change filter */
	const handleChange = price => {
		console.log(price);
		let filteredProducts = new Set();

		if (price.length === 0) setFilterProducts(allProducts);
		else {
			price.forEach(eachPrice => {
				if (eachPrice === "Less Than $15")
					allProducts.forEach(product => {
						if (parseFloat(product.price) < 15) filteredProducts.add(product);
					});
				if (eachPrice === "$15 - $50")
					allProducts.forEach(product => {
						if (
							parseFloat(product.price) > 15 &&
							parseFloat(product.price) <= 50
						)
							filteredProducts.add(product);
					});
				if (eachPrice === "$50 - $100")
					allProducts.forEach(product => {
						if (
							parseFloat(product.price) > 50 &&
							parseFloat(product.price) <= 100
						)
							filteredProducts.add(product);
					});
				if (eachPrice === "$100 - $150")
					allProducts.forEach(product => {
						if (
							parseFloat(product.price) > 100 &&
							parseFloat(product.price) <= 150
						)
							filteredProducts.add(product);
					});
				if (eachPrice === "$150 - $200")
					allProducts.forEach(product => {
						if (
							parseFloat(product.price) > 150 &&
							parseFloat(product.price) <= 200
						)
							filteredProducts.add(product);
					});
				if (eachPrice === "Over $200")
					allProducts.forEach(product => {
						if (
							parseFloat(product.price) > 150 &&
							parseFloat(product.price) <= 200
						)
							filteredProducts.add(product);
					});
			});
            setFilterProducts(Array.from(filteredProducts));
		}
	};

	return (
		<div className="product-filter">
			<div className="search-filter">
				{/** FILTER FOR PRICE */}
				<FormControl sx={{ m: 0.5, width: 200 }}>
					<InputLabel id="demo-multiple-checkbox-label">Price</InputLabel>
					<Select
						labelId="demo-multiple-checkbox-label"
						id="demo-multiple-checkbox"
						multiple
						value={price}
						onChange={e => {
							setPrice(e.target.value);
							handleChange(e.target.value);
						}}
						renderValue={selected => selected.join(", ")}
					>
						{prodPrices?.map(productPrice => (
							<MenuItem key={productPrice} value={productPrice}>
								<Checkbox checked={price.indexOf(productPrice) > -1} />
								<ListItemText primary={productPrice} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/** FILTER FOR SIZE */}
				<FormControl sx={{ m: 0.5, width: 100 }}>
					<InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
					<Select
						labelId="demo-multiple-checkbox-label"
						id="demo-multiple-checkbox"
						multiple
						value={size}
						onChange={e => setSize(e.target.value)}
						input={<OutlinedInput label="Size" />}
						renderValue={selected => selected.join(", ")}
					>
						{prodSizes?.map(prodSize => (
							<MenuItem key={prodSize} value={prodSize}>
								<Checkbox checked={size.indexOf(prodSize) > -1} />
								<ListItemText primary={prodSize} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/** FILTER FOR CATEGORY */}
				<FormControl sx={{ m: 0.5, width: 120 }}>
					<InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
					<Select
						labelId="demo-multiple-checkbox-label"
						id="demo-multiple-checkbox"
						multiple
						value={category}
						onChange={e => setCategory(e.target.value)}
						input={<OutlinedInput label="Category" />}
						renderValue={selected => selected.join(", ")}
					>
						{prodCategories?.map(prodCate => (
							<MenuItem key={prodCate} value={prodCate}>
								<Checkbox checked={category.indexOf(prodCate) > -1} />
								<ListItemText primary={prodCate} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/** FILTER FOR RESET */}
				<div
					className="reset-button"
					onClick={() => setFilterProducts(allProducts)}
				>
					Reset
				</div>
			</div>

			{/** Display all searched products using ProductCard */}
			<div>
				{filterProducts && filterProducts.length > 0 ? (
					<div className="ui grid display">
						{filterProducts.map(product => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				) : (
					<div>No product to display</div>
				)}
			</div>
		</div>
	);
};

export default ProductFilter