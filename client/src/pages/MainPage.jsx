import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "../components/navs/BottomBar";
import Navbar from "../components/navs/Navbar";
import "../styles/MainPage.scss";

const MainPage = () => {
	return (
		<Box className="main-page">
			<Navbar />
			<Box className="main-page__outlet" sx={{ py: 7 }}>
				<Outlet />
			</Box>
			<BottomBar />
		</Box>
	);
};

export default MainPage;
