import { yupResolver } from "@hookform/resolvers/yup";
import { AccountCircleOutlined, VisibilityOffOutlined, VisibilityOutlined, VpnKeyOutlined } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CircularProgress,
	IconButton,
	InputAdornment,
	Slide,
	SwipeableDrawer,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../assets/Logo.svg";
import LandingSlide from "../components/LandingSlide";
import appConfig from "../config.jsx";
import { useLoginAdminMutation, useLoginStudentMutation } from "../features/api/Auth/logApi";
import { loginSlice } from "../features/slices/authSlice";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import { loginSchema } from "../schemas/fields";
import { TabValues } from "../schemas/pages";
import "../styles/LoginPage.scss";
import "../utils/changeCase";
import { encrypt } from "../utils/encrypt";

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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginStudent, { isLoading: isStudentLoading }] = useLoginStudentMutation();
	const [loginAdmin, { isLoading: isAdminLoading }] = useLoginAdminMutation();
	const { visibility, toggleVisibility } = usePasswordVisibility();
	const [showLogin, setShowLogin] = useState(false);
	const [isStudentLogin, setIsStudentLogin] = useState(true); // State to toggle between student and admin login
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const handleLandingSlideComplete = () => {
		setShowLogin(true);
	};

	const submitHandler = async (data) => {
		console.log("👻 ~ data:", data);

		const { username, ...password } = data;
		try {
			const response = isStudentLogin
				? await loginStudent({ studentCode: username, ...password }).unwrap()
				: await loginAdmin(data).unwrap(); // Admin login mutation
			const encryptedToken = encrypt(response?.token);
			const encryptedUser = encrypt(isStudentLogin ? response?.student : response?.admin);
			sessionStorage.setItem(appConfig.sessionKeys?.token, encryptedToken?.encrypted);
			sessionStorage.setItem(appConfig?.sessionKeys?.user, encryptedUser?.encrypted);
			toast.success(response.message);
			dispatch(
				loginSlice({
					token: response?.token,
					user: isStudentLogin ? response?.student : response?.admin,
				})
			);
			navigate(isStudentLogin ? `${TabValues?.requests?.to}` : "/history");
		} catch (error) {
			toast.error(error?.data?.message);
		}
	};

	const toggleLoginType = () => {
		setShowLogin(false); // Trigger slide out
		setTimeout(() => {
			setIsStudentLogin(!isStudentLogin); // Switch form
			setShowLogin(true); // Trigger slide in after a short delay
		}, 300); // Short delay to allow the slide-out animation to complete
	};
	useEffect(() => {
		if (isAuthenticated) {
			return navigate(isStudentLogin ? `${TabValues?.requests?.to}` : "/history");
		}
	}, [isAuthenticated]);
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
			<SwipeableDrawer
				anchor={"bottom"}
				onTouchStart={(event) => {
					event.nativeEvent.defaultMuiPrevented = true;
				}}
				slots={{ backdrop: "invisible:true" }}
				disableSwipeToOpen
				open={showLogin}
				PaperProps={{ sx: { borderRadius: "2rem 2rem 0 0", padding: "4rem 1rem 6rem 1rem" } }}
			>
				<form onSubmit={handleSubmit(submitHandler)}>
					<Box className="login-page__login-form">
						<Box>
							<Typography variant="h4" fontWeight={"bold"} color="primary">
								{isStudentLogin ? appConfig?.buttonLabels?.login : "Admin Login"}
							</Typography>
							<Typography variant="caption">
								{isStudentLogin ? appConfig?.captions?.signIn : "Sign in as Admin"}
							</Typography>
						</Box>

						<TextField
							size="small"
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
							size="small"
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

						<Button
							variant="contained"
							fullWidth
							type="submit"
							disabled={isAdminLoading || isStudentLoading}
							startIcon={isAdminLoading || isStudentLoading ? <CircularProgress size={"14px"} /> : ""}
						>
							{isStudentLogin ? appConfig.buttonLabels.login : appConfig.buttonLabels.adminLogin}
						</Button>

						<Typography variant="body2" className="login-page__change-user">
							{isStudentLogin ? appConfig.captions.notAStudent : appConfig.captions.notAnAdmin}
							<span className="login-page__change-user--link" onClick={toggleLoginType}>
								{isStudentLogin ? appConfig.buttonLabels.adminLogin : appConfig.buttonLabels.login}
							</span>
						</Typography>
					</Box>
				</form>
			</SwipeableDrawer>
		</Box>
	);
};

export default LoginPage;
