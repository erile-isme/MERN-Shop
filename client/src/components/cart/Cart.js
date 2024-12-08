import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemFromCart } from "../../actions/cartAction";
import { MdOutlineDelete } from "react-icons/md";
import "./Cart.css";

const Cart = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	const cartList = useSelector(state => state.cart);
	console.log(cartList);

	return (
		<div className="cart-container">
			<div className="ui breadcrumb">
				<a className="section" href="/">
					Home
				</a>
				<i className="right chevron icon divider"></i>
				<div className="active section">Cart</div>
			</div>
			<div className="cart-content">
				<h1>SHOPPING CART</h1>
				<div className="ui grid cart-items">
					<div className="ten wide column">
						{cartList &&
							cartList.map((item, index) => (
								<div key={index} className="ui grid">
									{console.log(cartList[0].name)}
									<div className="three wide column">
										<img src={item.productId.img[0]} alt="Testing" />
									</div>
									<div className="thirteen wide column">
										<div className="item-title">
											<h1>Item {item.productId.name}</h1>
											<MdOutlineDelete
												onClick={() => removeItemFromCart(item.productId._id)}
											/>
										</div>
										<div className="item-content">
											<p>
												{item.productId.color
													? `Color: ${item.productId.color}`
													: ""}
											</p>
											<p>
												{item.productId.type
													? `Type: ${item.productId.type}`
													: ""}
											</p>
											<p>
												{item.productId.size
													? `Size: ${item.productId.size}`
													: ""}
											</p>
											<h3>CAD $ {item.productId.price}</h3>
											<div className="item-quantity"></div>
										</div>
									</div>
								</div>
							))}
					</div>
					<div className="five wide column">Order Summary</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
