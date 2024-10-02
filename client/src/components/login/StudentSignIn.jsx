import { Box, Card, Slide, TextField, Typography } from "@mui/material";
import React from "react";
import appConfig from "../../config";

const StudentSignIn = () => {
	return (
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
				<Typography variant="body2" className="login-page__change-user">
					Not a student? <span className="login-page__change-user--link">Admin Login</span>
				</Typography>
			</Card>
		</Slide>
	);
};

export default StudentSignIn;
