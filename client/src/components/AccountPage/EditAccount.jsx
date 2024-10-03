import { yupResolver } from "@hookform/resolvers/yup";
import { HorizontalRule } from "@mui/icons-material";
import { Box, Button, Paper, Slide, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import appConfig from "../../config";
import { accountSchema, loginSchema } from "../../schemas/fields";
import { toCamelCase } from "../../utils/changeCase";
import "../../styles/AccountPage.scss";
import { useGetCurrentStudentQuery } from "../../features/api/studentApi";
import moment from "moment";

const EditAccount = ({ open, onEntered, onExited, close }) => {
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
	const { data } = useGetCurrentStudentQuery();

	const {
		handleSubmit,
		register,
		reset,
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
		if (data) {
			reset({
				[fieldNames.firstName]: data?.student?.firstName || "",
				[fieldNames.middleName]: data?.student?.middleName || "",
				[fieldNames.lastName]: data?.student?.lastName || "",
				[fieldNames.birthdate]: moment(data?.student?.birthday).format("MMMM DD, YYYY") || "",
				[fieldNames.studentNumber]: data?.student?.studentCode,
				[fieldNames.department]: data?.student?.association,
				[fieldNames.medicalHistory]: data?.student?.medicalRecord,
				[fieldNames.allergies]: data?.student?.allergies,
				[fieldNames.emergencyContact]: data?.student?.emergencyContact,
				[fieldNames.relationship]: data?.student?.relationship,
				[fieldNames.contactNumber]: data?.student?.contactNumber,
			});
		}
	}, [data, reset]);
	const onSubmit = (data) => {
		console.log(data); // Handle form submission
	};

	return (
		<Slide in={open} direction="up" timeout={300} onEntered={onEntered} onExited={onExited} unmountOnExit>
			<Paper elevation={3} className="account-page__form">
				<HorizontalRule
					onClick={close}
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
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Personal Information Section */}
						<Box className="account-page__personal-info" sx={{ marginBottom: "16px" }}>
							<Typography variant="h6" color="textSecondary" gutterBottom>
								{appConfig.formSections.personalInfo}
							</Typography>
							<Box display="flex" flexDirection="column" gap={2}>
								<TextField
									size="small"
									label={appConfig.formFields.firstName}
									fullWidth
									disabled
									{...register(fieldNames.firstName)} // Registering field
									error={!!errors[fieldNames.firstName]} // Error handling
									helperText={errors[fieldNames.firstName]?.message} // Show error message
								/>
								<TextField
									size="small"
									label={appConfig.formFields.lastName}
									fullWidth
									disabled
									{...register(fieldNames.lastName)} // Registering field
									error={!!errors[fieldNames.lastName]}
									helperText={errors[fieldNames.lastName]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.middleName}
									fullWidth
									disabled
									{...register(fieldNames.middleName)} // Registering field
									error={!!errors[fieldNames.middleName]}
									helperText={errors[fieldNames.middleName]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.birthdate}
									fullWidth
									disabled
									{...register(fieldNames.birthdate)}
									error={!!errors[fieldNames.birthdate]}
									helperText={errors[fieldNames.birthdate]?.message}
								/>
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
									label={appConfig.formFields.studentNumber}
									disabled
									fullWidth
									{...register(fieldNames.studentNumber)}
									error={!!errors[fieldNames.studentNumber]}
									helperText={errors[fieldNames.studentNumber]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.department}
									fullWidth
									disabled
									{...register(fieldNames.department)}
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
									size="small"
									label={appConfig.formFields.medicalHistory}
									fullWidth
									{...register(fieldNames.medicalHistory)}
									error={!!errors[fieldNames.medicalHistory]}
									helperText={errors[fieldNames.medicalHistory]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.allergies}
									fullWidth
									{...register(fieldNames.allergies)}
									error={!!errors[fieldNames.allergies]}
									helperText={errors[fieldNames.allergies]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.emergencyContact}
									fullWidth
									{...register(fieldNames.emergencyContact)}
									error={!!errors[fieldNames.emergencyContact]}
									helperText={errors[fieldNames.emergencyContact]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.relationship}
									fullWidth
									{...register(fieldNames.relationship)}
									error={!!errors[fieldNames.relationship]}
									helperText={errors[fieldNames.relationship]?.message}
								/>
								<TextField
									size="small"
									label={appConfig.formFields.contactNumber}
									fullWidth
									{...register(fieldNames.contactNumber)}
									error={!!errors[fieldNames.contactNumber]}
									helperText={errors[fieldNames.contactNumber]?.message}
								/>
							</Box>
						</Box>
					</form>
					<Box sx={{ margin: 2 }}>
						<Button fullWidth variant="contained">
							Submit
						</Button>
					</Box>
				</Box>
			</Paper>
		</Slide>
	);
};

export default EditAccount;
