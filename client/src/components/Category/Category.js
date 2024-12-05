import React from 'react';
import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import "./Category.css";

const Category = () => {
	const categories = useSelector(state => state?.categories);

	console.log("CATEGORIES:", categories);

	return (
		<div className="category-container">
			{categories.map(category => (
				<CategoryItem key={category._id} category={category} />
			))}
		</div>
	);
};

export default Category;
