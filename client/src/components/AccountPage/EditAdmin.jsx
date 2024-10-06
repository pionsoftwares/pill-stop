import { yupResolver } from "@hookform/resolvers/yup";
import { PersonOutline, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, SwipeableDrawer, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import appConfig from "../../config";
import { useCreateAdminMutation, useUpdateAdminMutation } from "../../features/api/adminApi";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
import { loginSchema } from "../../schemas/fields";
import "../../styles/AccountPage.scss";
import { toCamelCase } from "../../utils/changeCase";

const EditAdmin = ({ open, onEntered, close, isUpdate }) => {
	const fieldNames = {
		username: toCamelCase(appConfig.formFields.username),
		password: toCamelCase(appConfig.formFields.password),
	};
	const userData = useSelector((state) => state.auth.user);
	const { visibility, toggleVisibility } = usePasswordVisibility();

	const [create] = useCreateAdminMutation();
	const [update] = useUpdateAdminMutation();

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
		resolver: yupResolver(loginSchema), // Assuming you have a validation schema
	});
	useEffect(() => {
		reset();
		if (isUpdate && userData?.username) {
			setValue(fieldNames.username, userData?.username || "");
		} else {
			reset();
		}
	}, [open]);
	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (data) => {
		try {
			let response; // Declare response outside the if statement

			if (isUpdate) {
				response = await update(data).unwrap();
			} else {
				response = await create(data).unwrap();
			}
			handleClose();
			toast.success(response?.message || "Operation successful", { position: "top-center" });
		} catch (error) {
			// Handle the error appropriately
			console.error("Error submitting data:", error); // Log the error for debugging
			toast.error(error?.data?.message || "An error occurred", { position: "top-center" }); // Notify the user
		}
	};

	return (
		<SwipeableDrawer
			anchor={"bottom"}
			disableSwipeToOpen
			open={open}
			PaperProps={{ sx: { borderRadius: "2rem 2rem 0 0", padding: "1rem 2rem" } }}
			onClose={close}
		>
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
		</SwipeableDrawer>
	);
};

export default EditAdmin;
