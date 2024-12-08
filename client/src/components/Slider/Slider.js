import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlider } from "../../actions/productAction";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import "./Slider.css";

const CarouselSlider = () => {
	const dispatch = useDispatch();
	const [currState, setCurrState] = useState(0);

	useEffect(() => {
		dispatch(fetchSlider());
	}, [dispatch]);

	const productList = useSelector(state => state.products.slider);
	const product = productList.filter(p => p === productList[currState]);
	const length = productList.length - 1;

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
				<div key={p._id}>
					<div className="slider-detail">
						<div className="slider-image">
							<img src={p.img} alt={p.description} />
						</div>
						<div className="slider-info">
							<h1 className="slider-title">{p.name}</h1>
							<div className="slider-description">{p.description}</div>
							<button>ENJOY NOW</button>
						</div>
					</div>
					<div className="carousel-boult">
						{productList.map((p, index) => (
							<span
								className={`slider-span ${currState === index ? "active" : ""}`}
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
	);
};

export default CarouselSlider;
