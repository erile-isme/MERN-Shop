import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const container = document.querySelector("#root");
const root = createRoot(container);
/* Logger for errors */
// const logger = store => next => action => {
// 	// Check if the action is a function (i.e., an async action created by redux-thunk)
// 	if (typeof action === "function")
// 		console.log("Dispatching async action:", action);
// 	else console.log("Dispatching:", action);

// 	// Pass the action to the next middleware or to the reducer
// 	return next(action);
// };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

root.render(
	// <GoogleOAuthProvider clientId={process.env.REACR_APP_CLIENT_ID}>
	<Provider store={store}>
		<App />
	</Provider>
	// </GoogleOAuthProvider>
);
