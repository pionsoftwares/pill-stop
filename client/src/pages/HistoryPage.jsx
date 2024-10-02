import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/navs/Navbar";
import { useGetStudentRequestQuery } from "../features/api/medicineApi";

const HistoryPage = () => {
	const { data } = useGetStudentRequestQuery();

	console.log("👻 ~ data:", data);

	return <Box></Box>;
};

export default HistoryPage;
