import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => {
	return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
	const [totalBeforeTax, setTotalBeforeTax] = useState(0);
	const [tax, setTax] = useState(0);
	const [orderTotal, setOrderTotal] = useState(0);
	const [shippingFee, setShippingFee] = useState(0);

	return (
		<OrderContext.Provider
			value={{
				totalBeforeTax,
				setTotalBeforeTax,
				tax,
				setTax,
				orderTotal,
				setOrderTotal,
				shippingFee,
				setShippingFee,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
