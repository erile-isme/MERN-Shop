import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import "./AddedItemReview.css";

const AddedItemReview = ({ isItemAdded, setItemAdded, cartItem }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartList = useSelector(state => state.cart);
	const subtotal = cartList.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	return (
		isItemAdded && (
			<div className="popup">
				<div className="popup-content">
					<div className="popup-title">
						<p>{cartItem.quantity} added to your cart</p>
						<MdClose onClick={() => setItemAdded(false)} />
					</div>
					<div className="ui divider"></div>
					<div className="popup-info">
						<div className="popup-total">
							<strong>Subtotal | {cartList.length} item(s)</strong>
							<strong>CAD $ {Math.round(subtotal * 100) / 100}</strong>
						</div>
						<p id="addedItemName">
							You just added <strong>{cartItem.name}</strong> to your cart!
						</p>
					</div>
					<div className="ui divider"></div>
					<div className="popup-button">
						<button className="ui button" onClick={() => setItemAdded(false)}>
							Continue Shopping
						</button>
						<button
							className="ui primary button"
							onClick={() => navigate("/cart")}
						>
							View Cart
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default AddedItemReview;
