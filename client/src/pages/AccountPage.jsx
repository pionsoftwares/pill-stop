import {
	Avatar,
	Backdrop,
	Box,
	Button,
	Card,
	CardHeader,
	ClickAwayListener,
	Divider,
	IconButton,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditAccount from "../components/AccountPage/EditAccount";
import appConfig from "../config";
import "../styles/AccountPage.scss";
import { stringAvatar } from "../utils/avatar";
import { ArrowRightOutlined, HorizontalRule } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import EditAdmin from "../components/AccountPage/EditAdmin";
import MedicineList from "../components/AccountPage/MedicineList";

const AccountPage = () => {
	const [isEditAccount, setIsEditAccount] = useState(false);
	const [isUpdateAccount, setIsUpdateAccount] = useState(false);
	const [isClickAwayActive, setIsClickAwayActive] = useState(false);
	const [isMedicineList, setIsMedicineList] = useState(false);
	const userData = useSelector((state) => state.auth.user);
	const isAdmin = !userData?.studentCode;

	const handleOpenEdit = () => {
		setIsEditAccount(true);
	};

	const handleOpenMedicine = () => {
		setIsMedicineList(true);
	};

	const handleCloseEdit = () => {
		setIsEditAccount(false);
		setIsClickAwayActive(false);
	};
	const handleCloseMedicineList = () => {
		setIsMedicineList(false);
		setIsClickAwayActive(false);
	};
	const handleLogout = useLogout();

	return (
		<Box className="account-page">
			<Box className={`account-page__header }`}>
				<Box className="account-page__user-content">
					<Avatar
						className="account-page__avatar"
						{...stringAvatar(isAdmin ? userData?.username : `${userData?.firstName}`)}
						style={{
							border: "2px solid white",
						}}
					/>
					<Box>
						<Typography variant="h6" fontWeight={"bold"} color="primary">
							{isAdmin ? userData?.username : `${userData?.firstName} ${userData?.lastName}`}
						</Typography>
						<Typography variant="caption">{isAdmin ? "Admin" : userData?.studentCode}</Typography>
					</Box>
				</Box>
				<Button
					disabled={isEditAccount}
					sx={{ pointerEvents: isEditAccount ? "none" : "" }}
					onClick={() => {
						handleOpenEdit();
						setIsUpdateAccount(true);
					}}
					variant="contained"
				>
					{appConfig.buttonLabels.editProfile}
				</Button>
				{isAdmin && (
					<>
						<Card
							elevation={2}
							sx={{ borderRadius: "8px" }}
							onClick={() => {
								handleOpenEdit();
								setIsUpdateAccount(false);
							}}
						>
							<CardHeader
								title="Admin"
								subheader="Create a new Admin"
								action={
									<IconButton aria-label="">
										<ArrowRightOutlined />
									</IconButton>
								}
							/>
						</Card>
						<Card
							elevation={2}
							sx={{ borderRadius: "8px" }}
							onClick={() => {
								handleOpenMedicine();
							}}
						>
							<CardHeader
								title="Medicines"
								subheader="View all medicine details"
								action={
									<IconButton aria-label="">
										<ArrowRightOutlined />
									</IconButton>
								}
							/>
						</Card>
					</>
				)}
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
					const selectElement = document.querySelector(".MuiSelect-root"); // Select element for the date range
					if (
						isClickAwayActive &&
						(isEditAccount || isMedicineList) &&
						paperElement &&
						!paperElement.contains(event.target) &&
						!selectElement.contains(event.target) // Check if the click is not on the select
					) {
						handleCloseEdit();
						handleCloseMedicineList();
					}
				}}
			>
				<Box>
					{isAdmin ? (
						<>
							<EditAdmin
								open={isEditAccount}
								close={handleCloseEdit}
								isUpdate={isUpdateAccount}
								direction="up"
								timeout={300}
								onEntered={() => setIsClickAwayActive(true)}
								onExited={() => setIsClickAwayActive(false)}
							/>
							<MedicineList
								open={isMedicineList}
								close={handleCloseMedicineList}
								direction="up"
								timeout={300}
								onEntered={() => setIsClickAwayActive(true)}
								onExited={() => setIsClickAwayActive(false)}
							/>
						</>
					) : (
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
					)}
				</Box>
			</ClickAwayListener>
			<Backdrop
				sx={{ color: "#fff", zIndex: 50 }}
				open={isEditAccount || isMedicineList}
				onClick={() => {
					handleCloseEdit();
					handleCloseMedicineList();
				}}
			/>
		</Box>
	);
};

export default AccountPage;
