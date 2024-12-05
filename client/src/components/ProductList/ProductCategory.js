import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./ProductCategory.css";

const ProductCategory = () => {
	const { categoryId } = useParams();
	const productList = useSelector(state => state.products).filter(
		product => product.category === categoryId
	);
	const categoryList = useSelector(state => state.categories);
	const currCategory = categoryList.filter(
		category => categoryId === category._id
	)[0];
	// console.log(currCategory);
	// console.log("PRODUCT LISTS CATEGORY: ", productList);

	return (
		<div className="prodcate-container">
			<div class="ui pointing secondary menu prodcate">
				{categoryList.map(category => (
					<Link
						to={`/categories/${category._id}`}
						className={`item prodcate ${
							categoryId === category._id ? "active" : ""
						}`}
						data-tab={category.name}
					>
						{category.name.toUpperCase()}
					</Link>
				))}
			</div>
			{productList.length ? (
				<div className="ui grid prodcate">
					{productList.map(product => (
						<div class="ui card">
							<div class="image">
								<img src={product.img} alt={product.description} />
								<img
									src={`http://localhost:5000/uploads/${product.img[0].replace(
										"resources\\",
										""
									)}`}
									alt={product.description}
								/>
							</div>
							<div class="content">
								<Link
									to={`/products/${currCategory.name}/${product._id}`}
									class="header"
								>
									{product.name}
								</Link>
								<div class="meta">
									<span class="date">Women</span>
								</div>
								<div class="description">{product.description.features}</div>
							</div>
							<div class="extra content prodcate">
								<h3>CAD $ {product.price}</h3>
							</div>
						</div>
					))}
				</div>
			) : (
				<h3>No products to show</h3>
			)}
		</div>
	);
};

export default ProductCategory;
