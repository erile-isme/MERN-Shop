import React from "react";
import "./Loading.css";

const Loading = ({ show }) => {
	return (
		show && (
			<div id="loading-overlay">
				<div className="dots-container">
					<span className="dot"></span>
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</div>
		)
	);
};

export default Loading;
