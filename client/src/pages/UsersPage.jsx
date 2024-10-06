import { Backdrop, Box, Button, ClickAwayListener, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetAllStudentsQuery } from "../features/api/studentApi";
import UserCard from "../components/UserPage/UserCard";
import EditAccount from "../components/AccountPage/EditAccount";
import { useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";
import DataStateHandler from "./DataStateHandler";

const UsersPage = () => {
	const { data, isLoading, isFetching } = useGetAllStudentsQuery();
	const [isEditAccount, setIsEditAccount] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [studentId, setStudentId] = useState();

	const userData = useSelector((state) => state.auth.user);

	const handleOpenEdit = () => {
		setIsEditAccount(true);
	};

	const handleCloseEdit = () => {
		setIsEditAccount(false);
	};
	return (
		<Box sx={{ width: "100%", padding: "1rem" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
				<Typography variant="h4" color="primary">
					Students
				</Typography>
				<Button
					startIcon={<AddOutlined />}
					variant="contained"
					onClick={() => {
						handleOpenEdit();
						setIsUpdate(false);
					}}
				>
					Create
				</Button>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<DataStateHandler isLoading={isLoading || isFetching}>
					{data?.students?.map((student) => {
						return (
							<UserCard
								action={() => {
									handleOpenEdit();
									setIsUpdate(true);
									setStudentId(student?.id);
								}}
								key={student.id}
								name={`${student?.firstName} ${student?.lastName}`}
								subhead={student?.association}
							/>
						);
					})}
				</DataStateHandler>
			</Box>

			<EditAccount
				open={isEditAccount}
				close={handleCloseEdit}
				isUpdate={isUpdate}
				studentId={isUpdate ? studentId : null}
				timeout={300}
			/>
		</Box>
	);
};

export default UsersPage;
