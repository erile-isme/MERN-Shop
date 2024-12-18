import React from "react";
import Category from "../Category/Category";
import ProductLists from "../ProductList/ProductLists";
import Slider from "../Slider/Slider";

const Home = () => {
	return (
		<div>
			<Slider />
			<Category />
			<ProductLists />
		</div>
	);
};

export default Home;
