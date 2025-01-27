import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NAV_MENU, CATEFGORY_ICONS } from "../../shared/tools.js";
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListSubheader,
	ListItemText,
	Collapse,
} from "@mui/material";
import { AiFillProduct } from "react-icons/ai";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { getCate } from "../../actions/categoryAction.js";

const Sidebar = ({ sideBar, setSideBar }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const categories = useSelector(state => state?.categories);

	useEffect(() => {
		dispatch(getCate());
	}, [dispatch]);

	return (
		<div className={`sidebar-menu ${sideBar ? "active" : ""}`}>
			<div className="sidebar-menulist">
				<div className="sidebar-link">
					<List
						sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
						component="nav"
						aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader component="div" id="nested-list-subheader">
								<h2>eri.</h2>
							</ListSubheader>
						}
					>
						{NAV_MENU.map(navLink => (
							<Link
								className="link-list"
								key={navLink.name}
								to={navLink.href}
								onClick={() => setSideBar(false)}
							>
								<ListItemButton>
									<ListItemIcon>{navLink.icon}</ListItemIcon>
									<ListItemText primary={navLink.name} />
								</ListItemButton>
							</Link>
						))}
						<ListItemButton onClick={() => setOpen(!open)}>
							<ListItemIcon>
								<AiFillProduct />
							</ListItemIcon>
							<ListItemText primary="Category" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List
								component="div"
								disablePadding
								onClick={() => setSideBar(false)}
							>
								{categories.map((category, index) => (
									<Link
										key={index}
										className="link-list"
										to={`/categories/${category._id}`}
									>
										<ListItemButton sx={{ pl: 4 }}>
											<ListItemIcon>{CATEFGORY_ICONS[index]}</ListItemIcon>
											<ListItemText primary={category.name} />
										</ListItemButton>
									</Link>
								))}
							</List>
						</Collapse>
					</List>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
