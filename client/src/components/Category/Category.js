import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getCate } from "../../actions/categoryAction";
import "./Category.css";

const Category = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const categories = useSelector(state => state?.categories);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!categories || categories.length === 0) dispatch(getCate());
	}, [dispatch, categories, location]);

	return (
		<div className="category-container">
			{categories.map(category => (
				<div key={category._id} className="category-item">
					<img src={category.img} alt={category.name} />
					<div className="category-body">
						<h1 className="category-title">{category.name}</h1>
						<p className="category-description">{category.description}</p>
						<nav>
							<Link
								to={`/categories/${category._id}`}
								className="category-link"
							>
								<button className="category-button" type="button">
									SHOP NOW
								</button>
							</Link>
						</nav>
					</div>
				</div>
			))}
		</div>
	);
};

export default Category;
