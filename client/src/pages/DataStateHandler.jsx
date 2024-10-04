import { CircularProgress } from "@mui/material";
import React from "react";
import "../styles/DataStateHandler.scss";
import logo from "../assets/Logo.svg";
const DataStateHandler = ({ isError, isLoading, isFetching, children }) => {
	if (isError) {
		return (
			<div className="overlay-container">
				<img src={logo} className="image" />
			</div>
		);
	} else if (isLoading || isFetching) {
		return (
			<div className="overlay-container">
				<CircularProgress />
			</div>
		);
	} else {
		return <>{children}</>;
	}
};

export default DataStateHandler;
