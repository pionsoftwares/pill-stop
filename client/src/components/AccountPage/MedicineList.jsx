import { HorizontalRule } from "@mui/icons-material";
import { Box, Paper, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../styles/AccountPage.scss";
import MedicineCard from "../RequestPage/MedicineCard";
import appConfig from "../../config";
import { useGetNumberMedicinesQuery } from "../../features/api/medicineApi";

const MedicineList = ({ open, onEntered, onExited, close, isUpdate, studentId, isViewOnly }) => {
	const [selectedSymptoms, setSelectedSymptoms] = useState([]);
	const { data } = useGetNumberMedicinesQuery();

	// Example remainingMedicineQuantities (replace with actual data source)

	// Create medicines array from appConfig
	const medicines = Object.values(appConfig.medicines).map((medicine) => {
		return {
			name: medicine.name,
			symptoms: medicine.symptoms,
			image: medicine.image,
			genericName: medicine?.genericName,
			quantity: data?.remainingMedicineQuantities[medicine.name] || 0, // Include medicine quantity
		};
	});

	// Collect all unique symptoms for the autocomplete options
	const allSymptoms = [...new Set(medicines.flatMap((medicine) => medicine.symptoms))];

	// Determine matching counts for each medicine
	const medicinesWithMatchingCounts = medicines.map((medicine) => {
		return {
			...medicine,
			matchingCount: selectedSymptoms.filter((symptom) =>
				medicine.symptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase()))
			).length,
		};
	});

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

	return (
		<Slide in={open} direction="up" timeout={300} onEntered={onEntered} onExited={handleExited} unmountOnExit>
			<Paper elevation={4} className="account-page__form">
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
				<Box className="content" sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
					{sortedMedicines.length > 0 ? (
						sortedMedicines.map((medicine) => {
							return (
								<MedicineCard
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
			</Paper>
		</Slide>
	);
};

export default MedicineList;
