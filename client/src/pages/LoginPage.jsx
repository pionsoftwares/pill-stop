import { yupResolver } from "@hookform/resolvers/yup";
import { AccountCircleOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Box, Button, Card, IconButton, InputAdornment, Slide, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import logo from "../assets/Logo.svg";
import LandingSlide from "../components/LandingSlide";
import appConfig from "../config.jsX";
import { useLoginAdminMutation, useLoginStudentMutation } from "../features/api/Auth/logApi";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import { loginSchema } from "../schemas/fields";
import "../styles/LoginPage.scss";
import "../utils/changeCase";

const usernameField = appConfig.formFields.username.toLowerCase();
const passwordField = appConfig.formFields.password.toLowerCase();

const LoginPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			[usernameField]: "", // Use dynamic default value for username
			[passwordField]: "", // Use dynamic default value for password
		},
		resolver: yupResolver(loginSchema),
	});
	const [loginStudent] = useLoginStudentMutation();
	const [loginAdmin] = useLoginAdminMutation();
	const { visibility, toggleVisibility } = usePasswordVisibility();
	const [showLogin, setShowLogin] = useState(false);

	const handleLandingSlideComplete = () => {
		setShowLogin(true);
	};

	const submitHandler = async (data) => {
		const { username, ...password } = data;
		try {
			const response = await loginStudent({ studentCode: username, ...password }).unwrap();
			toast.success(response.message);
		} catch (error) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<Box className="login-page" sx={{ backgroundColor: "primary.main" }}>
			<LandingSlide onComplete={handleLandingSlideComplete} />
			<Box className={`login-page__title ${showLogin ? "displaced" : ""}`}>
				<img src={logo} alt="Logo" style={{ maxWidth: "30%", maxHeight: "30%" }} />

				<Typography variant="h2" fontWeight={"bold"} color="primary.contrastText">
					{appConfig.appName.toPascalCase().toUpperCase()}
				</Typography>
				<Typography variant="caption" color="primary.contrastText">
					{appConfig?.captions?.tagLine}
				</Typography>
			</Box>
			<Slide in={showLogin} direction="up">
				{/* Shortened timeout for smoother transitions */}
				<Card className="login-page__login-form">
					<Box>
						<Typography variant="h4" fontWeight={"bold"} color="primary">
							{appConfig?.buttonLabels?.login}
						</Typography>
						<Typography variant="caption">{appConfig?.captions?.signIn}</Typography>
					</Box>

					<TextField
						{...register(usernameField)}
						label={usernameField.toCapitalCase()}
						fullWidth
						error={!!errors[usernameField]}
						helperText={errors?.[usernameField] ? errors?.[usernameField]?.message : " "}
						variant="standard"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircleOutlined />
									</InputAdornment>
								),
							},
						}}
					/>
					<TextField
						{...register(passwordField)}
						label={passwordField.toCapitalCase()}
						type={visibility[passwordField] ? "text" : "password"}
						error={!!errors[passwordField]}
						helperText={errors?.[passwordField] ? errors?.[passwordField]?.message : " "}
						fullWidth
						variant="standard"
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="start">
										<IconButton onClick={() => toggleVisibility(passwordField)}>
											{visibility.password ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
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

					<Button variant="contained" type="submit" onClick={handleSubmit(submitHandler)}>
						{appConfig?.buttonLabels.login}
					</Button>
				</Card>
			</Slide>
		</Box>
	);
};

export default LoginPage;
