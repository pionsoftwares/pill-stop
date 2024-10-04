import { PendingRounded, ThumbDownRounded, ThumbUpRounded } from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MedicineCard from "../components/RequestPage/MedicineCard";
import appConfig from "../config";
import { useGetAdminRequestQuery, useGetStudentRequestQuery } from "../features/api/medicineApi";
import "../styles/HistoryPage.scss";

const HistoryPage = () => {
	const [value, setValue] = useState(0);
	const userData = useSelector((state) => state.auth.user);
	const isAdmin = !userData?.studentCode;
	const handleChange = (event, newValue) => setValue(newValue);
	const { data: studentData } = useGetStudentRequestQuery();
	const { data: adminData } = useGetAdminRequestQuery();
	const data = studentData ?? adminData;
	// Tab labels
	const tabs = [
		{ label: "Approved Medicines", icon: <ThumbUpRounded style={{ color: "white" }} /> },
		{ label: "Pending Medicines", icon: <PendingRounded style={{ color: "white" }} /> },
		{ label: "Rejected Medicines", icon: <ThumbDownRounded style={{ color: "white" }} /> },
	];

	// Get data based on the selected tab
	const getCurrentRequests = () => {
		if (value === 0) return data?.medicineRequests?.Approved || [];
		if (value === 1) return data?.medicineRequests?.Pending || [];
		if (value === 2) return data?.medicineRequests?.Rejected || [];
		return [];
	};

	const currentRequests = getCurrentRequests();
	const getMedicineImage = (medicineName) => {
		for (const key in appConfig.medicines) {
			if (appConfig.medicines[key].name.toLowerCase() === medicineName.toLowerCase()) {
				return appConfig.medicines[key].image;
			}
		}
		return ""; // Return a default image or placeholder if not found
	};
	const getMedicineSymptoms = (medicineName) => {
		for (const key in appConfig.medicines) {
			if (appConfig.medicines[key].name.toLowerCase() === medicineName.toLowerCase()) {
				return appConfig.medicines[key].symptoms;
			}
		}
		return ""; // Return a default image or placeholder if not found
	};
	return (
		<Box className="history-page">
			<Box
				className="history-page__iconbar"
				sx={{
					backgroundColor: (theme) => theme.palette.primary.main,
				}}
			>
				<Tabs
					className="history-page__tabs"
					value={value}
					onChange={handleChange}
					centered
					aria-label="medicine request tabs"
					textColor="inherit"
					variant="fullWidth"
					TabIndicatorProps={{
						sx: {
							backgroundColor: "background.default",
							position: "absolute",
							zIndex: 99,
							bottom: "-5px",
							height: "25px",
							clipPath: "path('M 0 200 L 0,90 A 5,5 0,0,1 150,75 L 200 200 z');", // Single rounded hill shape
						},
					}}
				>
					{tabs.map((tab, index) => (
						<Tab key={index} icon={tab.icon} aria-label={tab.label} />
					))}
				</Tabs>
			</Box>
			{/* Display the current tab title */}
			<Box className="history-page__outlet">
				<Typography variant="h6" align="center" color="primary">
					{`${tabs[value].label}`}
				</Typography>
				{currentRequests.length > 0 ? (
					currentRequests.map((request) => {
						return (
							<MedicineCard
								code={request?.approval?.medicineCode?.code}
								rejection={request?.rejection}
								key={request.id}
								requestId={request?.id}
								statusLabel={request?.status}
								requestedBy={request?.student}
								name={request.medicineName}
								symptoms={getMedicineSymptoms(request?.medicineName)} // This can be passed as an array
								currentSymptoms={[request.symptoms]} // Simulated symptoms for the dialog
								// genericName={"Generic Name"} // Replace with your actual data if available
								isRecommended={request.status === "Approved"} // Custom logic
								image={getMedicineImage(request.medicineName)} // Replace with the actual image
							/>
						);
					})
				) : (
					<Typography variant="body1" textAlign="center">
						No {tabs[value].label.toLowerCase()} requests found.
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default HistoryPage;
