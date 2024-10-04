import { yupResolver } from "@hookform/resolvers/yup";
import { EventBusyOutlined, HorizontalRule } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, Paper, Slide, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import appConfig from "../../config";
import {
	useCreateStudentMutation,
	useGetStudentByIdQuery,
	useUpdateStudentMutation,
} from "../../features/api/studentApi";
import { accountSchema } from "../../schemas/fields";
import "../../styles/AccountPage.scss";
import { toCamelCase } from "../../utils/changeCase";

const EditAdmin = ({ isAdmin, open, onEntered, onExited, close, isUpdate, studentId }) => {
	const fieldNames = {
		username: toCamelCase(appConfig.formFields.username),
		password: toCamelCase(appConfig.formFields.password),
		firstName: toCamelCase(appConfig.formFields.firstName),
		middleName: toCamelCase(appConfig.formFields.middleName),
		lastName: toCamelCase(appConfig.formFields.lastName),
		birthdate: toCamelCase(appConfig.formFields.birthdate),
		studentNumber: toCamelCase(appConfig.formFields.studentNumber),
		department: toCamelCase(appConfig.formFields.department),
		medicalHistory: toCamelCase(appConfig.formFields.medicalHistory),
		allergies: toCamelCase(appConfig.formFields.allergies),
		emergencyContact: toCamelCase(appConfig.formFields.emergencyContact),
		relationship: toCamelCase(appConfig.formFields.relationship),
		contactNumber: toCamelCase(appConfig.formFields.contactNumber),
	};
	const { data } = useGetStudentByIdQuery({ id: studentId }, { refetchOnMountOrArgChange: true });
	const [create] = useCreateStudentMutation();
	const [update] = useUpdateStudentMutation();
	const [openDatepicker, setOpenDatepicker] = useState(false);
	const {
		handleSubmit,
		register,
		reset,

		control,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			[fieldNames.firstName]: "",
			[fieldNames.middleName]: "",
			[fieldNames.lastName]: "",
			[fieldNames.birthdate]: "",
			[fieldNames.studentNumber]: "",
			[fieldNames.department]: "",
			[fieldNames.medicalHistory]: "",
			[fieldNames.allergies]: "",
			[fieldNames.emergencyContact]: "",
			[fieldNames.relationship]: "",
			[fieldNames.contactNumber]: "",
		},
		resolver: yupResolver(accountSchema), // Assuming you have a validation schema
	});
	useEffect(() => {
		reset();
		if (isUpdate && data) {
			setValue(fieldNames.firstName, data?.student?.firstName || "");
			setValue(fieldNames.middleName, data?.student?.middleName || "");
			setValue(fieldNames.lastName, data?.student?.lastName || "");
			setValue(fieldNames.birthdate, moment(data?.student?.birthday).format("MM/DD/YYYY") || "");
			setValue(fieldNames.studentNumber, data?.student?.studentCode || "");
			setValue(fieldNames.department, data?.student?.association || "");
			setValue(fieldNames.medicalHistory, data?.student?.medicalRecord?.medicalHistory || "");
			setValue(fieldNames.allergies, data?.student?.medicalRecord?.allergies || "");
			setValue(fieldNames.emergencyContact, data?.student?.emergencyContact?.emergencyContactName || "");
			setValue(fieldNames.relationship, data?.student?.emergencyContact?.relationship || "");
			setValue(fieldNames.contactNumber, data?.student?.emergencyContact?.emergencyContactNumber || "");
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
								{appConfig.formSections.personalInfo}
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField
									size="small"
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.firstName)} // Registering field
									label={appConfig.formFields.firstName}
									fullWidth
									disabled={isUpdate}
									error={!!errors[fieldNames.firstName]} // Error handling
									helperText={errors[fieldNames.firstName]?.message} // Show error message
								/>
								<TextField
									size="small"
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.lastName)} // Registering field
									label={appConfig.formFields.lastName}
									fullWidth
									disabled={isUpdate}
									error={!!errors[fieldNames.lastName]}
									helperText={errors[fieldNames.lastName]?.message}
								/>
								<TextField
									size="small"
									slotProps={{
										inputLabel: {
											...(isUpdate ? { shrink: true } : {}),
										},
									}}
									{...register(fieldNames.middleName)} // Registering field
									label={appConfig.formFields.middleName}
									fullWidth
									disabled={isUpdate}
									error={!!errors[fieldNames.middleName]}
									helperText={errors[fieldNames.middleName]?.message}
								/>{" "}
								<Controller
									name={fieldNames.birthdate}
									control={control}
									render={({ field: { onChange, value } }) => (
										<DatePicker
											{...value}
											disabled={isUpdate}
											disableFuture
											open={openDatepicker}
											onClose={() => setOpenDatepicker(false)}
											label={"Birthday"}
											format="MM/DD/YYYY"
											value={value ? moment(value) : null}
											control={control}
											onChange={(event) => {
												onChange(moment(event).format("MM/DD/YYYY"));
											}}
											fullWidth
											slotProps={{
												textField: {
													"data-tour": "step-23",
													onClick: () => {
														isUpdate ? null : setOpenDatepicker(true);
													},
													color: "primary",

													fullWidth: true,
													size: "small",
													error: !!errors[fieldNames.birthdate],
													helperText: errors[fieldNames.birthdate]?.message,
													slotProps: {
														inputLabel: {
															...(isUpdate ? { shrink: true } : {}),
														},
													},

													InputProps: {
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	tabIndex={-1}
																	onClick={() =>
																		isUpdate ? null : setOpenDatepicker(true)
																	}
																>
																	<EventBusyOutlined />
																</IconButton>
															</InputAdornment>
														),
													},
												},
											}}
										/>
									)}
								/>
								{/* <TextField
									size="small"
									slotProps={{ inputLabel: {   ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.birthdate)}
									label={appConfig.formFields.birthdate}
									fullWidth
									disabled={isUpdate}
									error={!!errors[fieldNames.birthdate]}
									helperText={errors[fieldNames.birthdate]?.message}
								/> */}
							</Box>
						</Box>

						{/* Academic Information Section */}
						<Box className="account-page__academic-info" sx={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								{appConfig.formSections.academicInfo}
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField
									size="small"
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.studentNumber)}
									label={appConfig.formFields.studentNumber}
									disabled={isUpdate}
									fullWidth
									error={!!errors[fieldNames.studentNumber]}
									helperText={errors[fieldNames.studentNumber]?.message}
								/>
								<TextField
									size="small"
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.department)}
									label={appConfig.formFields.department}
									fullWidth
									disabled={isUpdate}
									error={!!errors[fieldNames.department]}
									helperText={errors[fieldNames.department]?.message}
								/>
							</Box>
						</Box>

						{/* Medical Information Section */}
						<Box className="account-page__medical-info" sx={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								{appConfig.formSections.medicalInfo}
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.medicalHistory)}
									size="small"
									label={appConfig.formFields.medicalHistory}
									fullWidth
									error={!!errors[fieldNames.medicalHistory]}
									helperText={errors[fieldNames.medicalHistory]?.message}
								/>
								<TextField
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.allergies)}
									size="small"
									label={appConfig.formFields.allergies}
									fullWidth
									error={!!errors[fieldNames.allergies]}
									helperText={errors[fieldNames.allergies]?.message}
								/>
								<TextField
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.emergencyContact)}
									size="small"
									label={appConfig.formFields.emergencyContact}
									fullWidth
									error={!!errors[fieldNames.emergencyContact]}
									helperText={errors[fieldNames.emergencyContact]?.message}
								/>
								<TextField
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.relationship)}
									size="small"
									label={appConfig.formFields.relationship}
									fullWidth
									error={!!errors[fieldNames.relationship]}
									helperText={errors[fieldNames.relationship]?.message}
								/>
								<TextField
									slotProps={{ inputLabel: { ...(isUpdate ? { shrink: true } : {}) } }}
									{...register(fieldNames.contactNumber)}
									size="small"
									label={appConfig.formFields.contactNumber}
									fullWidth
									error={!!errors[fieldNames.contactNumber]}
									helperText={errors[fieldNames.contactNumber]?.message}
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
