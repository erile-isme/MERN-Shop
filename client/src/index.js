import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
	// <GoogleOAuthProvider clientId={process.env.REACR_APP_CLIENT_ID}>
	<Provider store={store}>
		<App />
	</Provider>
	// </GoogleOAuthProvider>
);
