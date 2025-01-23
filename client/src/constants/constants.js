import { FaHome, FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdInventory } from "react-icons/md";
import {
	GiClothes,
	GiHealing,
	GiHeartNecklace,
	GiLipstick,
} from "react-icons/gi";

export const NAV_MENU = [
	{
		icon: <FaHome />,
		name: "Home",
		href: "/",
	},

	{
		icon: <IoPerson />,
		name: "My Account",
		href: "/login",
	},
	{
		icon: <FaShoppingCart />,
		name: "Cart",
		href: "/cart",
	},
	{ icon: <MdInventory />, name: "Products", href: "/products" },
	// {
	// 	name: "Add new Product",
	// 	href: "/addProd",
	// },
	// {
	// 	name: "Add new Category",
	// 	href: "/addCate",
	// },
	// {
	// 	// icon: <DiscountRoundedIcon />,
	// 	name: "Sale",
	// 	href: "/sale",
	// },
];

export const CATEFGORY_ICONS = [
	<GiClothes />,
	<GiHealing />,
	<GiHeartNecklace />,
	<GiLipstick />,
];
