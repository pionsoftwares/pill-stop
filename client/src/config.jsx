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
	userRoles: ["Admin", "User", "Guest"],
	// apiEndpoints: {
	// 	getUser: "/api/user",
	// 	saveUser: "/api/user/save",
	// 	deleteUser: "/api/user/delete",
	// },
	navItems: {
		// home: createTabItem("Home", <HomeOutlined />, <HomeRounded />),
		requests: createTabItem("Requests", <AddCircleOutline />, <AddCircleRounded />),
		home: createTabItem("History", <AccessTimeOutlined />, <AccessTimeFilledRounded />),
		account: createTabItem("Account", <AccountCircleOutlined />, <AccountCircleRounded />),
	},
};

export default appConfig;
