import { Avatar, Box, Button, ClickAwayListener, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditAccount from "../components/AccountPage/EditAccount";
import appConfig from "../config";
import "../styles/AccountPage.scss";
import { stringAvatar } from "../utils/avatar";
import { HorizontalRule } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";

const AccountPage = () => {
	const [isEditAccount, setIsEditAccount] = useState(false);
	const [isClickAwayActive, setIsClickAwayActive] = useState(false);
	const userData = useSelector((state) => state.auth.user);
	const isAdmin = !userData?.studentCode;

	const handleOpenEdit = () => {
		setIsEditAccount(true);
	};

	const handleCloseEdit = () => {
		setIsEditAccount(false);
		setIsClickAwayActive(false);
	};
	const handleLogout = useLogout();

	return (
		<Box className="account-page">
			<Box className={`account-page__header }`}>
				<Box className="account-page__user-content">
					<Avatar
						className="account-page__avatar"
						{...stringAvatar(isAdmin ? "Admin" : `${userData?.firstName}`)}
						style={{
							border: "2px solid white",
						}}
					/>
					<Box>
						<Typography variant="h6" fontWeight={"bold"} color="primary">
							{isAdmin ? "Admin" : `${userData?.firstName} ${userData?.lastName}`}
						</Typography>
						<Typography variant="caption">{userData?.studentCode}</Typography>
					</Box>
				</Box>
				<Button
					disabled={isEditAccount}
					sx={{ pointerEvents: isEditAccount ? "none" : "" }}
					onClick={() => {
						handleOpenEdit();
					}}
					variant="contained"
				>
					{appConfig.buttonLabels.editProfile}
				</Button>
				<Button
					disabled={isEditAccount}
					sx={{ pointerEvents: isEditAccount ? "none" : "" }}
					onClick={() => {
						handleLogout();
					}}
					variant="outlined"
				>
					LOG OUT
				</Button>
			</Box>

			<Box className="account-page__content"></Box>

			{/* ClickAwayListener only active when form is open */}
			<ClickAwayListener
				onClickAway={(event) => {
					const paperElement = document.querySelector(".account-page__form");
					if (isClickAwayActive && isEditAccount && paperElement && !paperElement.contains(event.target)) {
						handleCloseEdit();
						console.log("Clicked away");
					}
				}}
			>
				<Box>
					<EditAccount
						open={isEditAccount}
						close={handleCloseEdit}
						studentId={userData?.id}
						isUpdate={true}
						direction="up"
						timeout={300}
						onEntered={() => setIsClickAwayActive(true)}
						onExited={() => setIsClickAwayActive(false)}
					/>
				</Box>
			</ClickAwayListener>
		</Box>
	);
};

export default AccountPage;
