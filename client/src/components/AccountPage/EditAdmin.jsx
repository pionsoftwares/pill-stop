import { yupResolver } from "@hookform/resolvers/yup";
import {
	HorizontalRule,
	PersonOutline,
	VisibilityOffOutlined,
	VisibilityOutlined,
	VpnKeyOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, Paper, Slide, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import appConfig from "../../config";
import {
	useCreateStudentMutation,
	useGetStudentByIdQuery,
	useUpdateStudentMutation,
} from "../../features/api/studentApi";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
import { accountSchema } from "../../schemas/fields";
import "../../styles/AccountPage.scss";
import { toCamelCase } from "../../utils/changeCase";
import { useSelector } from "react-redux";

const EditAdmin = ({ isAdmin, open, onEntered, onExited, close, isUpdate }) => {
	const fieldNames = {
		username: toCamelCase(appConfig.formFields.username),
		password: toCamelCase(appConfig.formFields.password),
	};
	const userData = useSelector((state) => state.auth.user);
	const { visibility, toggleVisibility } = usePasswordVisibility();

	const [create] = useCreateStudentMutation();
	const [update] = useUpdateStudentMutation();

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			[fieldNames.username]: "",
			[fieldNames.password]: "",
		},
		resolver: yupResolver(accountSchema), // Assuming you have a validation schema
	});
	useEffect(() => {
		reset();
		if (isUpdate && userData?.username) {
			setValue(fieldNames.username, userData?.username || "");
			setValue(fieldNames.middleName, userData?.username || "");
		} else {
			reset();
		}
	}, [onEntered]);
	const handleClose = () => {
		reset();
		close();
	};
	const handleExited = () => {
		onExited();
		handleClose();
	};
	const onSubmit = async (data) => {
		const { studentNumber, ...newData } = data;
		const body = { ...newData, studentCode: studentNumber };
		try {
			let response; // Declare response outside the if statement

			if (isUpdate) {
				response = await update({ id: studentId, body }).unwrap();
			} else {
				response = await create({ ...newData, password: "123", studentCode: data?.studentNumber }).unwrap();
			}
			handleClose();
			toast.success(response?.result?.message || "Operation successful", { position: "top-center" });
		} catch (error) {
			// Handle the error appropriately
			console.error("Error submitting data:", error); // Log the error for debugging
			toast.error(error?.data?.message || "An error occurred", { position: "top-center" }); // Notify the user
		}
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

				<Typography variant="h5" color="primary" sx={{ paddingBottom: "1rem", textAlign: "center" }}>
					{appConfig.captions.accountDetails}
				</Typography>
				<Box className="account-page__main-form" sx={{ padding: "16px" }}>
					<form onSubmit={handleSubmit(onSubmit)} id="submit">
						{/* Personal Information Section */}
						<Box className="account-page__personal-info" sx={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								Admin Information
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField
									size="small"
									slotProps={{
										inputLabel: { ...(isUpdate ? { shrink: true } : {}) },
										input: {
											startAdornment: (
												<InputAdornment position="start">
													<PersonOutline />
												</InputAdornment>
											),
										},
									}}
									{...register(fieldNames.username)} // Registering field
									label={appConfig.formFields.username}
									fullWidth
									error={!!errors[fieldNames.username]} // Error handling
									helperText={errors[fieldNames.username]?.message} // Show error message
								/>
								<TextField
									{...register(fieldNames.password)} // Registering field
									label={fieldNames.password.toCapitalCase()}
									type={visibility[fieldNames.password] ? "text" : "password"}
									error={!!errors[fieldNames.password]}
									helperText={
										errors?.[fieldNames.password] ? errors?.[fieldNames.password]?.message : " "
									}
									fullWidth
									size="small"
									variant="outlined"
									slotProps={{
										input: {
											endAdornment: (
												<InputAdornment position="start">
													<IconButton onClick={() => toggleVisibility(fieldNames.password)}>
														{visibility.password ? (
															<VisibilityOffOutlined />
														) : (
															<VisibilityOutlined />
														)}
													</IconButton>
												</InputAdornment>
											),
											startAdornment: (
												<InputAdornment position="start">
													<VpnKeyOutlined />
												</InputAdornment>
											),
										},
									}}
								/>
							</Box>
						</Box>
					</form>
					<Box sx={{ margin: 2 }}>
						<Button fullWidth variant="contained" type="submit" form="submit">
							Submit
						</Button>
					</Box>
				</Box>
			</Paper>
		</Slide>
	);
};

export default EditAdmin;
