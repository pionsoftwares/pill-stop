// config/config.js
import {
	AccessTimeFilledRounded,
	AccessTimeOutlined,
	AccountCircleOutlined,
	AccountCircleRounded,
	AddCircleOutline,
	AddCircleRounded,
} from "@mui/icons-material";
import "./utils/changeCase";
import { createTabItem } from "./utils/createTabItem";

const appConfig = {
	appName: "PILL STOP",
	captions: {
		tagLine: "Your medicine, anytime.",
		signIn: "Please sign in to continue.",
	},
	buttonLabels: {
		save: "Save",
		cancel: "Cancel",
		delete: "Delete",
		login: "Sign In",
	},
	formFields: {
		username: "Username",
		password: "Password",
	},
	userRoles: ["Admin", "User", "Guest"],
	apiEndpoints: {
		index: "/api",
		studentLogin: "/login/student",
		adminLogin: "/login/admin",
	},
	sessionKeys: {
		token: "TOKEN",
		user: "USER",
	},
	navItems: {
		// home: createTabItem("Home", <HomeOutlined />, <HomeRounded />),
		requests: createTabItem("Requests", <AddCircleOutline />, <AddCircleRounded />),
		home: createTabItem("History", <AccessTimeOutlined />, <AccessTimeFilledRounded />),
		account: createTabItem("Account", <AccountCircleOutlined />, <AccountCircleRounded />),
	},
};

export default appConfig;
