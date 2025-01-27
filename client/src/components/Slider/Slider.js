import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlider } from "../../actions/productAction";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import "./Slider.css";
import { Link } from "react-router-dom";

const CarouselSlider = () => {
	const dispatch = useDispatch();
	const [currState, setCurrState] = useState(0);

	useEffect(() => {
		dispatch(fetchSlider());
	}, [dispatch]);

	const productList = useSelector(state => state.products.slider);
	const product = productList?.filter(p => p === productList[currState]);
	const length = productList?.length - 1;

	useEffect(() => {
		const timer = setTimeout(() => {
			if (currState === length) {
				setCurrState(0);
			} else {
				setCurrState(currState + 1);
			}
		}, 5000);
		return () => clearTimeout(timer);
	}, [currState, length]);

	const onClickNext = () => {
		if (currState === length) {
			setCurrState(0);
		} else {
			setCurrState(currState + 1);
		}
	};
	const onClickBack = () => {
		if (currState === 0) {
			setCurrState(length);
		} else {
			setCurrState(currState - 1);
		}
	};

	return (
		product &&
		product.length > 0 && (
			<div className="slider-container">
				<div
					className="slider-arrow left"
					onClick={() => {
						onClickBack(currState);
					}}
				>
					<NavigateBeforeRoundedIcon />
				</div>
				{product.map(p => (
					<div className="slider-card" key={p._id}>
						<div className="slider-detail">
							<div className="slider-image">
								<img
									src={`${process.env.REACT_APP_PROD}/${p.img[0]}`}
									alt={p.name}
								/>
							</div>
							<div className="slider-info">
								<h1 className="slider-title">{p.name}</h1>
								<div className="slider-description">
									{p.description.features}
								</div>
								<Link to={`/products/${p.category.name}/${p._id}`}>
									<button>SHOP NOW</button>
								</Link>
							</div>
						</div>
						<div className="carousel-boult">
							{productList.map((p, index) => (
								<span
									className={`slider-span ${
										currState === index ? "active" : ""
									}`}
									key={index}
								></span>
							))}
						</div>
					</div>
				))}
				<div
					className="slider-arrow right"
					onClick={() => {
						onClickNext(currState);
					}}
				>
					<NavigateNextRoundedIcon />
				</div>
			</div>
		)
	);
};

export default CarouselSlider;
