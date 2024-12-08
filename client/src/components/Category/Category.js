import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import "./Category.css";
import { getCate } from "../../actions/categoryAction";

const Category = () => {
	const dispatch = useDispatch();
	const categories = useSelector(state => state?.categories);

	useEffect(() => {
		if (!categories || categories.length === 0) dispatch(getCate());
	}, [dispatch, categories]);

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
