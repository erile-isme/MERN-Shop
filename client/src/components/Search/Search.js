import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, findProduct } from "../../actions/productAction";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "./Search.css";

const Search = ({ openSearch, setOpenSearch }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [inputDebounced, setInputDebounced] = useState("");

	const productLists = useSelector(state => state?.products.products);
	const searchedProducts = useSelector(
		state => state?.products.searchedProducts
	);
	console.log(searchedProducts);
	console.log(inputValue);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setInputDebounced(inputValue);
		}, 2000);
		return () => {
			clearTimeout(timerId);
		};
	}, [inputValue]);

	useEffect(() => {
		dispatch(fetchAllProducts()).then(() => setLoading(false));
		dispatch(findProduct(inputDebounced));
	}, [dispatch, inputDebounced]);

	return (
		<div className={`search-menu ${openSearch ? "active" : ""}`}>
			<MdClose className="close-button" onClick={() => setOpenSearch(false)} />
			<h1>Search</h1>
			<div>
				<Autocomplete
					id="asynchronous-demo"
					sx={{ width: 280 }}
					open={open}
					inputValue={inputValue}
					onInputChange={(e, newInputValue) => {
						setInputValue(newInputValue);
						if (newInputValue.trim() === "") {
							setOpen(false);
						}
					}}
					onChange={(e, value) => {
						if (value) {
							setInputValue(value.name); // update the input with selected suggestion
							setOpenSearch(false);
							navigate(
								`/products/search?name=${encodeURIComponent(value.name)}`
							);
						}
					}}
					onKeyDown={e => {
						if (e.key === "Enter" && inputValue.trim()) {
							e.preventDefault(); // prevent form submission if inside one
							setOpenSearch(false);
							navigate(
								`/products/search?name=${encodeURIComponent(inputValue)}`
							);
						}
					}}
					onOpen={() => {
						if (inputValue.trim() !== "") {
							setOpen(true);
						}
					}}
					onClose={() => setOpen(false)}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					getOptionLabel={option => option.name}
					options={productLists}
					loading={loading}
					renderInput={params => (
						<TextField
							{...params}
							label="Products"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? (
											<CircularProgress color="inherit" size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default Search;
