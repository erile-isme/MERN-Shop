import React, { useEffect } from "react";
import Category from "../Category/Category";
import ProductLists from "../ProductList/ProductLists";
import Slider from "../Slider/Slider";
import jwt from "jsonwebtoken";

const Home = () => {
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt.decode(token);
			if (!user) {
				localStorage.removeItem("token");
			}
		}
	}, []);

	return (
		<div>
			<Slider />
			<Category />
			<ProductLists />
		</div>
	);
};

export default Home;
