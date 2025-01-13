import React, { useEffect, useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import Badge from "@mui/material/Badge";
import Search from "../Search/Search";
import Sidebar from "./Sidebar";
import "./Navbar.css";

const Navbar = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState(false);
	const [sideBar, setSideBar] = useState(false);

	const token = localStorage.getItem("token");
	const cartList = useSelector(state => state.cart);

	useEffect(() => {
		if (token) dispatch(fetchCart());
	}, [dispatch, token]);

	return (
		<div>
			<div className="navbar-container">
				<div className={`navbar-right ${sideBar ? "active" : ""}`}>
					<Hamburger
						rounded
						size={18}
						toggle={setSideBar}
						toggled={sideBar}
						distance="sm"
					/>
				</div>
				<div className="brandname">
					<Link to="/">
						<h2>eri.</h2>
					</Link>
				</div>
				<div className="navbar-left">
					<div className="navbar-search">
						<div>{search && <Search />}</div>
						<FaSearch className="icon" onClick={() => setSearch(!search)} />
					</div>
					<Link to="/cart">
						<Badge
							color="primary"
							badgeContent={token ? cartList?.length : 0}
							showZero
							overlap="rectangular"
						>
							<MdShoppingCart className="icon" />
						</Badge>
					</Link>
					<Link to={`${token ? "/account/profile" : "/login"}`}>
						<IoPerson className="icon" />
					</Link>
				</div>
			</div>

			{sideBar ? (
				<Sidebar sideBar={sideBar} setSideBar={() => setSideBar(!sideBar)} />
			) : (
				<></>
			)}
		</div>
	);
};

export default Navbar;
