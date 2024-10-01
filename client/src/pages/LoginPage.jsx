import { AccountCircleOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Box, Button, Card, InputAdornment, Slide, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import logo from "../assets/Logo.svg";
import LandingSlide from "../components/LandingSlide";
import appConfig from "../config.jsX";
import "../styles/LoginPage.scss";
import "../utils/changeCase";
const LoginPage = () => {
	const [showLogin, setShowLogin] = useState(false);

	const handleLandingSlideComplete = () => {
		setShowLogin(true);
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
						label="Username"
						fullWidth
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
						label="Password"
						fullWidth
						variant="standard"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<VpnKeyOutlined />
									</InputAdornment>
								),
							},
						}}
					/>
					<Button variant="contained">{appConfig?.buttonLabels.login}</Button>
				</Card>
			</Slide>
		</Box>
	);
};

export default LoginPage;
