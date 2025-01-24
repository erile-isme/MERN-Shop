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
	// const subtotal = cartList.map(item => total += item.price)

	useEffect(() => {
		if (!cartList) dispatch(fetchCart());
	});

	return (
		isItemAdded && (
			<div className="popup">
				<div className="popup-content">
					<div className="popup-title">
						<p>{cartItem.quantity} added to your cart</p>
						<MdClose />
					</div>
					<div className="ui divider"></div>
					<div className="popup-info">
						<div className="popup-total">
							<strong>Subtotal | {cartList.length} item(s)</strong>
							<strong>CAD $ 5.00</strong>
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
