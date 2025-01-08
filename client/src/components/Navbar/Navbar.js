import React, { useEffect, useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cartAction";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Badge from "@mui/material/Badge";
import Search from "../Search/Search";
import Sidebar from "./Sidebar";
import "./styles.css";

const Navbar = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState(false);
	const [sideBar, setSideBar] = useState(false);

	const token = localStorage.getItem("token");
	const cartList = useSelector(state => state.cart);

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

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
					<Link to="/">eri.</Link>
				</div>
				<div className="navbar-left">
					<div className="navbar-search">
						<div>{search && <Search />}</div>
						<SearchOutlinedIcon onClick={() => setSearch(!search)} />
					</div>
					<Link to="/cart">
						<Badge
							color="primary"
							badgeContent={cartList?.length}
							showZero
							overlap="rectangular"
						>
							<ShoppingCartOutlinedIcon />
						</Badge>
					</Link>
					<Link to={`${token ? "/account/profile" : "/login"}`}>
						<PersonOutlineOutlinedIcon />
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
