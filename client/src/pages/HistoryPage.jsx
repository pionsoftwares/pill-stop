import { FolderRounded, PendingRounded, ThumbDownRounded, ThumbUpRounded } from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MedicineCard from "../components/RequestPage/MedicineCard";
import appConfig from "../config";
import {
	useGetAdminRequestQuery,
	useGetStudentRequestQuery,
	useGetUnfilteredRequestsQuery,
} from "../features/api/medicineApi";
import "../styles/HistoryPage.scss";
import DataStateHandler from "./DataStateHandler";

const HistoryPage = () => {
	const [value, setValue] = useState(0);
	const userData = useSelector((state) => state.auth.user);
	const isAdmin = !userData?.studentCode;
	const handleChange = (event, newValue) => setValue(newValue);
	const {
		data: studentData,
		isLoading: isStudentLoading,
		isFetching: isStudentFetching,
	} = useGetStudentRequestQuery();
	const {
		data: unfilteredRequest,
		isLoading: isUnFilteredRequestLoading,
		isFetching: isUnfilteredRequestFetching,
	} = useGetUnfilteredRequestsQuery();
	const { data: adminData, isLoading: isAdminLoading, isFetching: isAdminFetching } = useGetAdminRequestQuery();
	const data = studentData ?? adminData;
	const isLoading = isAdmin ? isAdminLoading : isStudentLoading;
	const isFetching = isAdmin ? isAdminFetching : isStudentFetching;
	// Tab labels
	const tabs = [
		{ label: "Approved Medicines", icon: <ThumbUpRounded style={{ color: "white" }} /> },
		{ label: "Pending Medicines", icon: <PendingRounded style={{ color: "white" }} /> },
		{ label: "Rejected Medicines", icon: <ThumbDownRounded style={{ color: "white" }} /> },
		...(isAdmin ? [{ label: "Medicine Request Record", icon: <FolderRounded style={{ color: "white" }} /> }] : []),
	];

	// Get data based on the selected tab
	const getCurrentRequests = () => {
		// Check which value is selected (e.g., 0: Approved, 1: Pending, 2: Rejected, 3: Combined)
		if (value === 0) {
			// Filter for Approved requests
			return (
				unfilteredRequest.medicineRequests
					.filter((req) => req.status === "Approved")
					.slice()
					.sort((a, b) => new Date(b.approval?.approvedAt) - new Date(a.approval?.approvedAt)) || []
			);
		}

		if (value === 1) {
			// Filter for Pending requests
			return unfilteredRequest.medicineRequests.filter((req) => req.status === "Pending") || [];
		}

		if (value === 2) {
			// Filter for Rejected requests
			return unfilteredRequest.medicineRequests.filter((req) => req.status === "Rejected") || [];
		}

		if (value === 3) {
			// Combined Approved and Rejected requests
			const combinedRequests = unfilteredRequest.medicineRequests.filter(
				(req) => req.status === "Approved" || req.status === "Rejected"
			);

			return combinedRequests.length > 0
				? combinedRequests.slice().sort((a, b) => {
						const approvedAtA = new Date(a.approval?.approvedAt) || new Date(0); // Fallback to epoch if not present
						const approvedAtB = new Date(b.approval?.approvedAt) || new Date(0); // Fallback to epoch if not present
						return approvedAtB - approvedAtA; // Sort approved requests first
				  })
				: []; // Return an empty array if no requests are present
		}

		return []; // Default return if no valid value
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
					centered={tabs.length <= 4}
					allowScrollButtonsMobile={tabs.length > 4} // Enable scroll buttons only if more than 4 tabs
					variant={tabs.length > 4 ? "scrollable" : "fullWidth"} // Scrollable if more than 4 tabs, standard otherwise
					scrollButtons={tabs.length > 4 ? "auto" : false} // Show scroll buttons if more than 3 tabs
					aria-label="medicine request tabs"
					textColor="inherit"
					TabIndicatorProps={{
						sx: {
							backgroundColor: "background.default",
							position: "absolute",
							zIndex: 1,
							bottom: "-5px",
							height: "15px",
							borderRadius: "100px 100px 0 0", // Half-circle shape on top
							transform: "translateX(0)", // Remove manual translation, indicator will adjust automatically
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
				<DataStateHandler
					isLoading={
						isLoading ||
						isFetching ||
						isAdminFetching ||
						isUnFilteredRequestLoading ||
						isUnfilteredRequestFetching ||
						isAdminLoading
					}
				>
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
							No {tabs[value].label.toLowerCase()} found.
						</Typography>
					)}
				</DataStateHandler>
			</Box>
		</Box>
	);
};

export default HistoryPage;
