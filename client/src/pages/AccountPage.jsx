import { Avatar, Box, Button, Paper, Slide, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/AccountPage.scss";
import { stringAvatar } from "../utils/avatar";
import { Circle } from "@mui/icons-material";
const AccountPage = () => {
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
				<Button variant="contained">Edit Profile</Button>
			</Box>

			<Slide in={true} direction="up" timeout={300} unmountOnExit>
				<Paper elevation={3} className={`account-page__form `}>
					<Stack spacing={2}>
						<TextField size="small" label="Student Number" placeholder="20240078" />
						<TextField size="small" label="Surname, First Name M.I." placeholder="Dela Cruz, Juan R." />
						<TextField size="small" label="Medical History" placeholder="N/A" />
						<TextField size="small" label="Allergies" placeholder="Antibiotics" />
						<TextField size="small" label="Section/Department" placeholder="Basic Education Department" />
						<TextField size="small" label="Birthdate (MM/DD/YYYY)" placeholder="01/01/2009" />
						<TextField size="small" label="Name of Emergency Contact" placeholder="Dela Cruz, Damien" />
						<TextField size="small" label="Relationship To Student" placeholder="Father" />
						<TextField size="small" label="Contact Number" placeholder="+6397 089 5647" />
					</Stack>
				</Paper>
			</Slide>
		</Box>
	);
};

export default AccountPage;
