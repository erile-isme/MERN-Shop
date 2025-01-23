import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { OrderProvider } from "./components/OrderSummary/OrderProvider";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import Login from "./components/Login/Login";
// import Sale from "./components/Sale/Sale";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Navbar from "./components/Navbar/Navbar";
import ProdForm from "./components/Form/ProductForm";
import CateForm from "./components/Form/CategoryForm";
import ProductCategory from "./components/ProductList/ProductCategory";
import ProductLists from "./components/ProductList/ProductLists";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Copyright from "./components/Copyright/Copyright";
import Account from "./components/Account/Account";
import PrivateRoute from "./components/PrivateRoute";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import OrderHistoryDetail from "./components/OrderHistory/OrderHistoryDetail";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Profile from "./components/Account/Profile";
import Sidebar from "./components/Navbar/Sidebar";
import "./index.css";

const App = () => {
	const [currId, setCurrId] = useState(null);
	const [sideBar, setSideBar] = useState(false);

	return (
		<div>
			<div className={`overlay ${sideBar ? "active" : ""}`}></div>
			<BrowserRouter>
				<Navbar sideBar={sideBar} setSideBar={setSideBar} />
				{sideBar ? (
					<Sidebar sideBar={sideBar} setSideBar={() => setSideBar(!sideBar)} />
				) : (
					<></>
				)}
				<Routes>
					{/** Public routes */}
					<Route path="/" element={<Home />} />
					<Route
						path="/products/:category/:productId"
						element={<ProductDetail />}
					/>
					<Route path="/products" element={<ProductLists />} />
					<Route path="/categories/:categoryId" element={<ProductCategory />} />
					<Route path="/login" element={<Login />} />

					{/** Private routes */}
					<Route element={<PrivateRoute />}>
						<Route path="/cart" element={<Cart />} />
						<Route
							path="/payment"
							element={
								<OrderProvider>
									<Payment />
								</OrderProvider>
							}
						/>
						<Route path="/account" element={<Account />}>
							<Route path="profile" element={<Profile />} />
							<Route path="orderhistory" element={<OrderHistory />}></Route>
							<Route
								path="orderhistory/:orderHistoryId"
								element={<OrderHistoryDetail />}
							/>
						</Route>
						<Route path="/placeorder/:orderId" element={<PlaceOrder />} />
					</Route>

					<Route
						path="/addProd"
						element={<ProdForm currId={currId} setCurrId={setCurrId} />}
					/>
					<Route path="/addCate" element={<CateForm />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Newsletter />
			<Footer />
			<Copyright />
		</div>
	);
};

export default App;
