import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

import appConfig from "../config.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "../pages/PrivateRoutes";
import RequestPage from "../pages/RequestPage";

export const router = createBrowserRouter([
	{
		path: "*",
		element: <NotFound />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		element: (
			// <BackupProvider>
			<PrivateRoutes />

			// </BackupProvider>
		),
		children: [
			{
				path: "/",
				element: <MainPage />,
				children: [
					{
						path: appConfig?.navItems?.home?.to,
						element: <HistoryPage />,
					},
					{
						path: appConfig?.navItems?.requests?.to,
						element: <RequestPage />,
					},
					{
						path: appConfig?.navItems?.account?.to,
						element: <AccountPage />,
					},
				],
			},
		],
	},
]);
