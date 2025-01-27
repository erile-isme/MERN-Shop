import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsInCategory } from "../../actions/productAction";
import ProductCard from "../Product/ProductCard";
import "./ProductCategory.css";

const ProductCategory = () => {
	const dispatch = useDispatch();
	const { categoryId } = useParams();

	const categoryList = useSelector(state => state.categories);
	const productList = useSelector(state => state.products.products);

	console.log(categoryList);
	console.log(productList);

	useEffect(() => {
		window.scroll(0, 0);
		dispatch(getProductsInCategory(categoryId));
	}, [dispatch, categoryId]);

	return (
		<div className="prodcate-container">
			<div className="ui pointing secondary menu prodcate">
				{categoryList.map(category => (
					<Link
						key={category._id}
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
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			) : (
				<h3>No products to show</h3>
			)}
		</div>
	);
};

export default ProductCategory;
