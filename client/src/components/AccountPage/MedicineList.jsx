import { AccountBoxRounded, HorizontalRule, Inventory2Rounded } from "@mui/icons-material";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Slide, Tab, Tabs, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import appConfig from "../../config";
import { useGetDispensedMedicinesQuery, useGetNumberMedicinesQuery } from "../../features/api/medicineApi";
import DataStateHandler from "../../pages/DataStateHandler";
import "../../styles/AccountPage.scss";
import MedicineCard from "../RequestPage/MedicineCard";

const MedicineList = ({ open, onEntered, onExited, close, isUpdate, studentId, isViewOnly }) => {
	const [selectedRange, setSelectedRange] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const handleRangeChange = (event) => {
		const range = event.target.value;
		setSelectedRange(range);

		// Calculate dateFrom based on selected range
		let fromDate;
		if (range === "last7Days") {
			fromDate = moment().subtract(7, "days").format("YYYY-MM-DD");
		} else if (range === "last15Days") {
			fromDate = moment().subtract(15, "days").format("YYYY-MM-DD");
		} else if (range === "last30Days") {
			fromDate = moment().subtract(30, "days").format("YYYY-MM-DD");
		}

		// Set dateFrom only if a valid range is selected
		if (fromDate) {
			setDateFrom(fromDate);
		}
	};

	const [selectedSymptoms, setSelectedSymptoms] = useState([]);
	const { data: remainingData, isLoading, isFetching } = useGetNumberMedicinesQuery();
	const {
		data: dispensedData,
		isLoading: isRequestedLoading,
		isFetching: isRequestedFetching,
	} = useGetDispensedMedicinesQuery({ dateFrom });

	// Create medicines array from appConfig
	const medicines = Object.values(appConfig.medicines).map((medicine) => ({
		name: medicine.name,
		symptoms: medicine.symptoms,
		image: medicine.image,
		genericName: medicine?.genericName,
		quantity: remainingData?.remainingMedicineQuantities[medicine.name] || 0, // Include medicine quantity
	}));

	// Collect all unique symptoms for the autocomplete options
	const allSymptoms = [...new Set(medicines.flatMap((medicine) => medicine.symptoms))];

	// Determine matching counts for each medicine
	const medicinesWithMatchingCounts = medicines.map((medicine) => ({
		...medicine,
		matchingCount: selectedSymptoms.filter((symptom) =>
			medicine.symptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase()))
		).length,
	}));

	// Sort medicines by matching count (desc)
	const sortedMedicines = medicinesWithMatchingCounts.sort((a, b) => b.matchingCount - a.matchingCount);

	// Get the highest matching count
	const highestMatchingCount = sortedMedicines[0]?.matchingCount || 0;

	const handleClose = () => {
		close();
	};
	const handleExited = () => {
		onExited();
		handleClose();
	};

	const handleChange = (event, newValue) => setValue(newValue);

	return (
		<Slide in={open} direction="up" timeout={300} onEntered={onEntered} onExited={handleExited} unmountOnExit>
			<Paper elevation={4} className="account-page__form">
				<DataStateHandler isLoading={isFetching || isLoading}>
					<HorizontalRule
						onClick={handleClose}
						sx={{
							position: "absolute",
							width: "100%",
							top: "20px",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					/>

					<Box className="content" sx={{ display: "flex", flexDirection: "column" }}>
						<FormControl fullWidth sx={{ marginTop: "1rem" }}>
							<InputLabel id="date-range-label">Select Date Range</InputLabel>
							<Select
								labelId="date-range-label"
								value={selectedRange}
								label="Select Date Range"
								onChange={handleRangeChange}
							>
								<MenuItem value="">
									<em>Select a date range</em>
								</MenuItem>
								<MenuItem value="last7Days">Last 7 Days</MenuItem>
								<MenuItem value="last15Days">Last 15 Days</MenuItem>
								<MenuItem value="last30Days">Last 30 Days</MenuItem>
							</Select>
						</FormControl>
						<Box sx={{ overflowL: "auto", maxHeight: "60vh", overflow: "auto" }}>
							{sortedMedicines.length > 0 ? (
								sortedMedicines.map((medicine) => {
									const requestedQuantity =
										dispensedData?.requestedMedicineQuantities[medicine.name] || 0;
									return (
										<MedicineCard
											dispensed={`${requestedQuantity}`}
											key={medicine.name}
											requestButton={false}
											remaining={medicine?.quantity}
											name={medicine.name}
											image={medicine.image}
											symptoms={medicine.symptoms}
											genericName={medicine?.genericName}
											quantity={medicine.quantity} // Pass the quantity
											isRecommended={
												medicine.matchingCount !== 0
													? medicine.matchingCount === highestMatchingCount
													: false
											} // Pass the recommendation status
											currentSymptoms={selectedSymptoms} // Pass only the matching symptoms
										/>
									);
								})
							) : (
								<Typography>No medicines found</Typography>
							)}
						</Box>
					</Box>
				</DataStateHandler>
			</Paper>
		</Slide>
	);
};

export default MedicineList;
