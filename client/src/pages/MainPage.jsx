import { Box } from "@mui/material";
import React, { useEffect } from "react";
import BottomBar from "../components/navs/BottomBar";
import Navbar from "../components/navs/Navbar";
import "../styles/MainPage.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TabValues } from "../schemas/pages";

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
