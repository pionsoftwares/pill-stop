import { Box, TextField, InputAdornment, Autocomplete, Typography } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import React, { useState } from "react";
import "../styles/RequestPage.scss";
import appConfig from "../config";
import MedicineCard from "../components/RequestPage/MedicineCard";

const RequestPage = () => {
	const [selectedSymptoms, setSelectedSymptoms] = useState([]);

	// Create medicines array from appConfig
	const medicines = Object.values(appConfig.medicines).map((medicine) => {
		return {
			name: medicine.name,
			symptoms: medicine.symptoms,
			image: medicine.image,
			genericName: medicine?.genericName,
		};
	});

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

	return (
		<Box className="request-page">
			<Box
				className="symptoms"
				sx={{
					backgroundColor: (theme) => theme.palette.primary.main,
					padding: "2rem",
				}}
			>
				<Autocomplete
					multiple
					options={allSymptoms}
					onChange={(event, value) => setSelectedSymptoms(value)}
					renderInput={(params) => (
						<TextField
							{...params}
							label={appConfig?.captions?.feeling}
							type="search"
							fullWidth
							variant="filled"
							size="small"
							placeholder="Fever, nausea, heartburn"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<InputAdornment position="end">
										<SearchRounded />
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiFilledInput-root": {
									backgroundColor: "white",
									"&.Mui-focused": {
										backgroundColor: "primary.contrastText",
									},
								},
							}}
						/>
					)}
				/>
			</Box>
			<Box className="content" sx={{ display: "flex", flexDirection: "column" }}>
				{sortedMedicines.length > 0 ? (
					sortedMedicines.map((medicine) => {
						// Filter current symptoms to only include those that match the medicine's symptoms

						return (
							<MedicineCard
								key={medicine.name}
								name={medicine.name}
								image={medicine.image}
								symptoms={medicine.symptoms}
								genericName={medicine?.genericName}
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
	);
};

export default RequestPage;
