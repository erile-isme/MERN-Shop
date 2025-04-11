import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { Dropdown, DropdownItem, DropdownMenu } from "semantic-ui-react";
import { getUser } from "../../actions/userAction";
import Hamburger from "hamburger-react";
import Badge from "@mui/material/Badge";
import Search from "../Search/Search";
import "./Navbar.css";

const Navbar = ({ sideBar, setSideBar, openSearch, setOpenSearch }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = localStorage.getItem("token");
	const cartList = useSelector(state => state?.cart);
	const currentUser = useSelector(state => state?.user.user);

	useEffect(() => {
		if (token) {
			dispatch(fetchCart());
			dispatch(getUser());
		}
	}, [dispatch, token]);

	return (
		<div>
			<div className="navbar-container">
				<div className={`navbar-left ${sideBar ? "active" : ""}`}>
					<Hamburger rounded size={18} toggle={setSideBar} toggled={sideBar} />
				</div>
				<div className="brandname">
					<Link to="/">
						<h2>eri.</h2>
					</Link>
				</div>
				<div className="navbar-right">
					<div className="navbar-search">
						{openSearch && (
							<Search openSearch={openSearch} setOpenSearch={setOpenSearch} />
						)}
						<FaSearch
							className="icon"
							onClick={() => setOpenSearch(!openSearch)}
						/>
					</div>
					<div onClick={() => navigate("/cart")}>
						<Badge
							color="primary"
							badgeContent={token ? cartList?.length : 0}
							showZero
							overlap="rectangular"
						>
							<MdShoppingCart className="icon" />
						</Badge>
					</div>
					{token ? (
						<div className="profile-icon">
							<Dropdown
								trigger={
									<span className="dropdown span">
										<IoPerson className="icon" />
										{currentUser && <p>Hello {currentUser?.name}</p>}
									</span>
								}
								pointing="top left"
								icon={null}
							>
								<DropdownMenu>
									<DropdownItem>
										<div onClick={() => navigate("/account/profile")}>
											Profile
										</div>
									</DropdownItem>
									<DropdownItem>
										<div onClick={() => navigate("/account/orderhistory")}>
											Order History
										</div>
									</DropdownItem>
									<DropdownItem>
										<div onClick={() => navigate("/account/wishlist")}>
											Wish List
										</div>
									</DropdownItem>
									<DropdownItem>
										<div
											onClick={() => {
												localStorage.removeItem("token");
												localStorage.removeItem("tokenExpiration");
												navigate("/");
											}}
										>
											Sign Out
										</div>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					) : (
						<div onClick={() => navigate("/login")}>
							<IoPerson className="icon" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
