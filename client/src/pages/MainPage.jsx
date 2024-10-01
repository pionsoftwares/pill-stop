import { Box } from "@mui/material";
import React from "react";
import BottomBar from "../components/navs/BottomBar";
import Navbar from "../components/navs/Navbar";
import "../styles/MainPage.scss";
import { Outlet } from "react-router-dom";

const MainPage = () => {
	return (
		<Box className="main-page">
			<Navbar />
			<Box sx={{ py: 7 }}>
				<Outlet />
			</Box>
			<BottomBar />
		</Box>
	);
};

export default MainPage;
