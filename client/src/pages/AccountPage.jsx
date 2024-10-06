import { ArrowRightOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardHeader, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditAccount from "../components/AccountPage/EditAccount";
import EditAdmin from "../components/AccountPage/EditAdmin";
import MedicineList from "../components/AccountPage/MedicineList";
import appConfig from "../config";
import { useLogout } from "../hooks/useLogout";
import "../styles/AccountPage.scss";
import { stringAvatar } from "../utils/avatar";

const AccountPage = () => {
	const [isEditAccount, setIsEditAccount] = useState(false);
	const [isUpdateAccount, setIsUpdateAccount] = useState(false);

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
	};
	const handleCloseMedicineList = () => {
		setIsMedicineList(false);
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

			{isAdmin ? (
				<>
					<EditAdmin
						open={isEditAccount}
						close={handleCloseEdit}
						isUpdate={isUpdateAccount}
						direction="up"
						timeout={300}
					/>
					<MedicineList open={isMedicineList} close={handleCloseMedicineList} direction="up" timeout={300} />
				</>
			) : (
				<EditAccount
					open={isEditAccount}
					close={handleCloseEdit}
					studentId={userData?.id}
					isUpdate={true}
					timeout={300}
				/>
			)}
		</Box>
	);
};

export default AccountPage;
