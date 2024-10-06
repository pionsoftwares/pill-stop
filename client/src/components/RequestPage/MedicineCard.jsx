import {
	AccountBalance,
	AssignmentIndRounded,
	FaceRounded,
	HelpOutline,
	ThumbDown,
	ThumbUp,
	VisibilityOutlined,
} from "@mui/icons-material";
import {
	Backdrop,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	ClickAwayListener,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
} from "@mui/material";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
	useApproveRequestMutation,
	useRejectRequestMutation,
	useRequestMedicineMutation,
} from "../../features/api/medicineApi";
import useConfirm from "../../hooks/useConfirm";
import useReason from "../../hooks/useReason";
import EditAccount from "../AccountPage/EditAccount";
import RequestButton from "./RequestButton"; // Import the reusable button component
const MedicineCard = ({
	name,
	image,
	isRecommended,
	dispensed,
	remaining,
	code,
	symptoms,
	currentSymptoms,
	rejection,
	date,
	genericName,
	requestId,
	statusLabel,
	requestButton = true,
	requestedBy,
}) => {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	const confirm = useConfirm();
	const reason = useReason();
	const [requestMeds] = useRequestMedicineMutation();
	const [approveRequest] = useApproveRequestMutation();
	const [rejectRequest] = useRejectRequestMutation();
	const userData = useSelector((state) => state.auth.user);
	const isAdmin = !userData?.studentCode;
	const [isEditAccount, setIsEditAccount] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	const matchingCurrentSymptoms = currentSymptoms?.filter((symptom) =>
		symptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase()))
	);
	const [open, setOpen] = useState(false);
	const handleOpenEdit = () => {
		setIsEditAccount(true);
	};

	const handleCloseEdit = () => {
		setIsEditAccount(false);
	};
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

	// Updated logic to filter out current symptoms and return the symptom itself if no match is found
	const filteredCurrentSymptoms = currentSymptoms?.map((symptom) => {
		const match = filteredSymptoms.find((s) => s.toLowerCase().includes(symptom.toLowerCase()));
		return match || symptom; // Return the matched symptom or the original if no match
	});
	const isButtonDisabled = currentSymptoms.length === 0; // Disable button if no current symptoms

	const requestMedicine = () => {
		const title = `Request Confirmation`;
		const description = `You are about to request for ${name} for your ${currentSymptoms?.[0]}, continue?`;
		confirm({
			title,
			description,
			callback: () =>
				requestMeds({
					symptoms: filteredCurrentSymptoms?.[0] ?? currentSymptoms?.[0],
					medicineName: name,
				}).unwrap(),
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
	const approve = () => {
		const title = `Approve Confirmation`;
		const description = `You are about to approve for ${name}, continue?`;
		confirm({
			title,
			description,
			callback: () =>
				approveRequest({
					medicineRequestId: requestId,
				}).unwrap(),
		})
			.then((res) => {
				if (res.isConfirmed) {
					toast.success(`${res?.result?.message}`, { position: "top-center" });
				}
			})
			.catch((error) => {
				if (error?.isConfirmed) {
					toast.error(error?.error?.data?.message);
				}
			});
	};
	const reject = () => {
		const title = `Approve Confirmation`;
		const description = `You are about to approve for ${name}, continue?`;
		reason({
			title,
			description,
			callback: (data) =>
				rejectRequest({
					id: requestId,
					body: { reason: data },
				}).unwrap(),
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
		<>
			<Card
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					padding: "1rem",
					margin: "1rem",
					minHeight: "150px",
					position: "relative",
					boxShadow: 3,
					transition: "none", // Remove hover transformation
				}}
			>
				<img src={image} alt={name} width={100} height={100} style={{ marginRight: "1rem" }} />

				<CardContent sx={{ textAlign: "left", flexGrow: 1 }} onClick={isAdmin ? handleClickOpen : undefined}>
					<Typography variant="h6" component="div">
						{name}
					</Typography>{" "}
					<Typography variant="caption">{genericName}</Typography>
					{isAdmin && statusLabel && (
						<>
							<Typography variant="caption" component="div" display={"flex"} alignItems={"center"}>
								{`${requestedBy?.firstName} ${requestedBy?.lastName}`}
							</Typography>
							{/* <Typography variant="caption" component="div" display={"flex"} alignItems={"center"}>
								{`${requestedBy?.studentCode}`}
							</Typography> */}
						</>
					)}
					<Box display={"flex"} flexDirection={"column"} gap={0.5}>
						{((isRecommended && matchingCurrentSymptoms) || statusLabel) && (
							<Box>
								<Chip
									label={statusLabel ?? "Suggested"}
									color={
										statusLabel === "Approved" || isRecommended
											? "success"
											: statusLabel === "Rejected"
											? "error"
											: "info"
									}
									size="small"
								/>
							</Box>
						)}
						{dispensed && (
							<Box>
								<Chip size="small" color="info" label={"Requested: " + dispensed} />
							</Box>
						)}
						{remaining && (
							<Box>
								<Chip size="small" color="info" label={"Remaining: " + remaining} />
							</Box>
						)}
						{rejection ? (
							<Typography variant="caption">
								Remarks:
								<span style={{ textDecoration: "underline" }}>{rejection?.reason}</span>{" "}
							</Typography>
						) : code ? (
							<Box display={"flex"} alignItems={"center"} gap={1}>
								<Typography variant="caption">Dispense Code: </Typography>
								<Box>
									<Chip
										variant="outlined"
										color="success"
										size="small"
										label={<span style={{ textDecoration: "underline" }}>{code}</span>}
									/>
								</Box>
							</Box>
						) : (
							""
						)}
					</Box>
				</CardContent>
				{/* Small Request Button on the right side of the card */}
				{!statusLabel && requestButton && (
					<RequestButton
						disabled={isButtonDisabled}
						onClick={() => {
							// Handle the request logic here
							requestMedicine();
						}}
					/>
				)}
				{isAdmin && statusLabel?.toLowerCase() == "pending" && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
							alignSelf: "flex-end",
							zIndex: 2,
						}}
					>
						<Button size="small" variant="contained" color="success" onClick={approve}>
							{isMobile ? (
								<Tooltip title="Approve">
									<ThumbUp />
								</Tooltip>
							) : (
								"Approve"
							)}
						</Button>
						<Button size="small" variant="contained" onClick={reject}>
							{isMobile ? (
								<Tooltip title="Reject">
									<ThumbDown />
								</Tooltip>
							) : (
								"Reject"
							)}
						</Button>
					</Box>
				)}

				{/* Always visible Help Icon */}
				<IconButton onClick={handleClickOpen} sx={{ position: "absolute", top: 10, right: 10 }}>
					<HelpOutline />
				</IconButton>

				{/* Dialog to show symptoms */}
			</Card>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle display={"flex"} gap={2} alignItems={"center"}>
					{name}
					{((isRecommended && matchingCurrentSymptoms) || statusLabel) && (
						<Chip
							label={statusLabel ?? "Recommended"}
							color={
								statusLabel === "Approved" || isRecommended
									? "success"
									: statusLabel === "Rejected"
									? "error"
									: "info"
							}
							size="small"
						/>
					)}
					{code ? (
						<Chip
							variant="outlined"
							color="success"
							size="small"
							label={<span style={{ textDecoration: "underline" }}>{code}</span>}
						/>
					) : (
						""
					)}
				</DialogTitle>
				<DialogContent>
					<Suspense fallback={<CircularProgress />}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center", // Center align the image
								mb: 2, // Margin bottom for spacing
							}}
						>
							<img src={image} alt={name} width={100} height={100} style={{ marginRight: "1rem" }} />
						</Box>
						{isAdmin && statusLabel && (
							<Box display={"flex"} flexDirection={"column"} gap={1}>
								<Divider textAlign="left">
									<Typography variant="caption">Requested By:</Typography>
								</Divider>
								<Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"}>
									<Box display={"flex"} flexDirection="column" gap={1}>
										<Typography
											variant="caption"
											component="div"
											display={"flex"}
											alignItems={"center"}
											gap={1}
										>
											<FaceRounded />
											{`${requestedBy?.firstName} ${requestedBy?.lastName}`}
										</Typography>
										<Typography
											variant="caption"
											component="div"
											display={"flex"}
											alignItems={"center"}
											gap={1}
										>
											<AssignmentIndRounded />
											{`${requestedBy?.studentCode}`}
										</Typography>
									</Box>
									<Typography
										variant="caption"
										component="div"
										display={"flex"}
										alignItems={"center"}
										gap={1}
									>
										<AccountBalance />
										{`${requestedBy.association}`}
									</Typography>
								</Box>
								<Button
									fullWidth
									size="small"
									variant="outlined"
									startIcon={<VisibilityOutlined fontSize="inherit" />}
									onClick={() => {
										handleOpenEdit();
										setIsUpdate(true);
										handleClose();
									}}
								>
									View Full Details
								</Button>
							</Box>
						)}
						{remaining && (
							<Box>
								<Chip size="small" color="info" label={"Stocks: " + remaining} />
							</Box>
						)}
						{(!isAdmin || remaining) && (
							<>
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
							</>
						)}
						{(isAdmin ? currentSymptoms : filteredCurrentSymptoms)?.length > 0 && ( // Conditional rendering
							<>
								<Divider textAlign="left" sx={{ my: 2 }}>
									<Typography variant="caption">
										{isAdmin ? "Symptom" : "May address your:"}
									</Typography>
								</Divider>
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
									{(isAdmin ? currentSymptoms : filteredCurrentSymptoms).map((currentSymptom) => {
										return (
											<Chip
												size="small"
												color="warning"
												key={currentSymptom} // Ensure this is unique
												label={currentSymptom} // Display only the filtered English terms
												variant="filled"
											/>
										);
									})}
								</Box>
							</>
						)}

						{rejection && (
							<>
								<Divider textAlign="left" sx={{ my: 2, color: "red" }}>
									<Typography variant="caption">Remarks</Typography>
								</Divider>
								{rejection ? <Typography variant="body2">{rejection?.reason}</Typography> : ""}
							</>
						)}
					</Suspense>
				</DialogContent>
				{/* Small Request Button on the right side of the dialog */}
				{!statusLabel && requestButton && (
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
				)}{" "}
				{isAdmin && statusLabel?.toLowerCase() == "pending" && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "1rem",
							padding: "1rem",
							alignSelf: "flex-end",
						}}
					>
						<Button size="small" variant="contained" onClick={reject}>
							Reject
						</Button>
						<Button size="small" variant="contained" color="success" onClick={approve}>
							Approve
						</Button>
					</Box>
				)}
			</Dialog>{" "}
			<Box>
				<EditAccount
					open={isEditAccount}
					close={handleCloseEdit}
					isViewOnly={isUpdate}
					studentId={isUpdate ? requestedBy?.id : null}
					timeout={300}
				/>
			</Box>
		</>
	);
};

export default MedicineCard;
