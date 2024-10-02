import { Avatar, Box, Button, Paper, Slide, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/AccountPage.scss";
import { stringAvatar } from "../utils/avatar";
const AccountPage = () => {
	const [isEditAccount, setIsEditAccount] = useState(false);
	const userData = useSelector((state) => state.auth.user);

	return (
		<Box className="account-page">
			<Box className={`account-page__header }`}>
				<Box className="account-page__user-content">
					<Avatar
						className="account-page__avatar"
						{...stringAvatar(`${userData?.firstName}`)}
						style={{
							border: "2px solid white",
						}}
					/>
					<Box>
						<Typography
							variant="h6"
							fontWeight={"bold"}
							color="primary"
						>{`${userData?.firstName} ${userData?.lastName}`}</Typography>
						<Typography variant="caption">{userData?.studentCode}</Typography>
					</Box>
				</Box>
				<Button onClick={() => setIsEditAccount((prev) => !prev)} variant="contained">
					Edit Profile
				</Button>
			</Box>

			<Box className="account-page__content"></Box>
			<Slide in={isEditAccount} direction="up" timeout={300} unmountOnExit>
				<Paper elevation={3} className="account-page__form">
					{/* Title fixed at the top */}
					<Stack spacing={2} paddingBottom={2}>
						<Typography variant="h5" color="primary">
							Account Details
						</Typography>
					</Stack>

					{/* Scrollable content */}
					<Box className="account-page__main-form" style={{ padding: "16px" }}>
						{/* Personal Information Section */}
						<Box className="account-page__personal-info" style={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								Personal Information
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField
									size="small"
									label="Surname, First Name M.I."
									placeholder="Dela Cruz, Juan R."
									fullWidth
								/>
								<TextField
									size="small"
									label="Surname, First Name M.I."
									placeholder="Dela Cruz, Juan R."
									fullWidth
								/>
								<TextField
									size="small"
									label="Birthdate (MM/DD/YYYY)"
									placeholder="01/01/2009"
									fullWidth
								/>
							</Box>
						</Box>

						{/* Academic Information Section */}
						<Box className="account-page__academic-info" style={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								Academic Information
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField size="small" label="Student Number" placeholder="20240078" fullWidth />
								<TextField
									size="small"
									label="Section/Department"
									placeholder="Basic Education Department"
									fullWidth
								/>
							</Box>
						</Box>

						{/* Medical Information Section */}
						<Box className="account-page__medical-info" style={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								Medical Information
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField size="small" label="Medical History" placeholder="N/A" fullWidth />
								<TextField size="small" label="Allergies" placeholder="Antibiotics" fullWidth />
								<TextField
									size="small"
									label="Name of Emergency Contact"
									placeholder="Dela Cruz, Damien"
									fullWidth
								/>
								<TextField
									size="small"
									label="Relationship To Student"
									placeholder="Father"
									fullWidth
								/>
								<TextField
									size="small"
									label="Contact Number"
									placeholder="+63 9 123 456 7890"
									fullWidth
								/>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Slide>
		</Box>
	);
};

export default AccountPage;
