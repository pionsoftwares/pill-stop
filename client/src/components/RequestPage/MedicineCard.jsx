import {
	Card,
	CardContent,
	Typography,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Divider,
	Chip,
	Box,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React, { useState } from "react";
import RequestButton from "./RequestButton"; // Import the reusable button component
import useConfirm from "../../hooks/useConfirm";
import { useRequestMedicineMutation } from "../../features/api/medicineApi";
import { toast } from "sonner";
const MedicineCard = ({ name, image, isRecommended, symptoms, currentSymptoms, genericName }) => {
	const confirm = useConfirm();
	const [requestMeds] = useRequestMedicineMutation();

	const matchingCurrentSymptoms = currentSymptoms?.filter((symptom) =>
		symptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase()))
	);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// Function to filter out the Tagalog terms
	const filterSymptoms = (arr) => {
		return arr.map((item) => {
			const match = item.match(/^(.*?)\s*\(/); // Match everything before the '('
			return match ? match[1].trim() : item; // Return the English part
		});
	};

	const filteredSymptoms = filterSymptoms(symptoms);
	const filteredCurrentSymptoms = filterSymptoms(matchingCurrentSymptoms);
	const isButtonDisabled = currentSymptoms.length === 0; // Disable button if no current symptoms

	const requestMedicine = () => {
		const title = `Request Confirmation`;
		const description = `You are about to request for ${name} for your ${currentSymptoms?.[0]}, continue?`;
		confirm({
			title,
			description,
			callback: () => requestMeds({ symptoms: currentSymptoms?.[0], medicineName: name }).unwrap(),
		})
			.then((res) => {
				if (res.isConfirmed) {
					toast.success(res?.result?.message, { position: "top-center" });
				}
			})
			.catch((error) => {
				if (error?.isConfirmed) {
					toast.error(error?.error?.data?.message);
				}
			});
	};

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				padding: "1rem",
				margin: "1rem",
				position: "relative",
				boxShadow: 3,
				transition: "none", // Remove hover transformation
			}}
		>
			<img src={image} alt={name} width={100} height={100} style={{ marginRight: "1rem" }} />
			<CardContent sx={{ textAlign: "left", flexGrow: 1 }}>
				<Typography variant="h6" component="div">
					{name}
				</Typography>{" "}
				{isRecommended && matchingCurrentSymptoms && (
					<Typography color="text.secondary">
						<Chip label="Recommended" color="success" size="small" />
					</Typography>
				)}
				<Typography variant="caption" component="div">
					{genericName}
				</Typography>
			</CardContent>
			{/* Small Request Button on the right side of the card */}
			<RequestButton
				disabled={isButtonDisabled}
				onClick={() => {
					// Handle the request logic here
					requestMedicine();
				}}
			/>

			{/* Always visible Help Icon */}
			<IconButton onClick={handleClickOpen} sx={{ position: "absolute", top: 10, right: 10 }}>
				<HelpOutlineIcon />
			</IconButton>

			{/* Dialog to show symptoms */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{name}</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center", // Center align the image
							mb: 2, // Margin bottom for spacing
						}}
					>
						<img src={image} alt={name} width={100} height={100} style={{ marginRight: "1rem" }} />
					</Box>
					<Divider textAlign="left">
						<Typography variant="caption">Medication for:</Typography>
					</Divider>
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
						{filteredSymptoms.map((symptom) => (
							<Chip
								size="small"
								color="secondary"
								key={symptom}
								label={symptom} // Display only the filtered English terms
								variant="filled"
							/>
						))}
					</Box>

					{filteredCurrentSymptoms.length > 0 && ( // Conditional rendering
						<>
							<Divider textAlign="left" sx={{ my: 2 }}>
								<Typography variant="caption">You are feeling:</Typography>
							</Divider>
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
								{filteredCurrentSymptoms.map((currentSymptom) => (
									<Chip
										size="small"
										color="warning"
										key={currentSymptom}
										label={currentSymptom} // Display only the filtered English terms
										variant="filled"
									/>
								))}
							</Box>
						</>
					)}
				</DialogContent>
				{/* Small Request Button on the right side of the dialog */}
				<Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
					<RequestButton
						onClick={() => {
							// Handle the request logic here
							requestMedicine();
							setOpen(false);
						}}
						disabled={isButtonDisabled} // Disable the button based on current symptoms
					/>
				</Box>
			</Dialog>
		</Card>
	);
};

export default MedicineCard;
