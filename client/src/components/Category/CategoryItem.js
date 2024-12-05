import React from 'react';
import { Link } from 'react-router-dom';
import "./Category.css";

const CategoryItem = ({ category }) => {
	console.log(category);
	return (
		<div key={category._id} className="category-item">
			<img src={category.img} alt={category.name} />
			<div className="category-body">
				<h1 className="category-title">{category.name}</h1>
				<p className="category-description">{category.description}</p>
				<nav>
					<Link to={`/categories/${category._id}`} className="category-link">
						<button className="category-button" type="button">
							SHOP NOW
						</button>
					</Link>
				</nav>
			</div>
		</div>
	);
};

export default CategoryItem;
