import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsInCategory } from "../../actions/productAction";
import "./ProductCategory.css";

const ProductCategory = () => {
	const dispatch = useDispatch();
	const { categoryId } = useParams();

	const categoryList = useSelector(state => state.categories);
	const currCategory = categoryList.filter(
		category => categoryId === category._id
	)[0];
	console.log(currCategory);

	useEffect(() => {
		dispatch(getProductsInCategory(currCategory._id));
	}, [dispatch, currCategory]);

	const productList = useSelector(state => state.products.products);

	return (
		<div className="prodcate-container">
			<div class="ui pointing secondary menu prodcate">
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
						<div key={product._id} className="ui card">
							<div>
								<img
									className="img-prodcate"
									src={`http://localhost:5000/uploads/${product.img[0].replace(
										"resources/",
										""
									)}`}
									alt={product.name}
								/>
							</div>
							<div className="content">
								<Link
									to={`/products/${currCategory.name}/${product._id}`}
									className="header"
								>
									{product.name}
								</Link>
								<div className="meta">
									<span className="date">Women</span>
								</div>
								<div className="description">
									{product.description.features}
								</div>
							</div>
							<div className="extra content prodcate">
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
