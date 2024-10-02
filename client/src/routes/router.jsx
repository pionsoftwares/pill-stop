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
					// {
					// 	path: "inventory",
					// 	element: <InventoryPage />,
					// },
					// {
					// 	path: "products",
					// 	element: (
					// 		<AccessibleBy permission={"Products"}>
					// 			<ProductsPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "users",
					// 	element: (
					// 		<AccessibleBy permission={"Users"}>
					// 			<UsersPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "roles",
					// 	element: (
					// 		<AccessibleBy permission={"Roles"}>
					// 			<RolesPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "suppliers",
					// 	element: (
					// 		<AccessibleBy permission={"Suppliers"}>
					// 			<SuppliersPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "generic_name",
					// 	element: (
					// 		<AccessibleBy permission={"Generic Name"}>
					// 			<GenericsPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "categories",
					// 	element: (
					// 		<AccessibleBy permission={"Categories"}>
					// 			<CategoriesPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "uom",
					// 	element: (
					// 		<AccessibleBy permission={"UOM"}>
					// 			<UOMPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "reports",
					// 	element: (
					// 		<AccessibleBy permission={"Reports"}>
					// 			<ReportsPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "history",
					// 	element: (
					// 		<AccessibleBy permission={"History"}>
					// 			<HistoryPage />
					// 		</AccessibleBy>
					// 	),
					// },
					// {
					// 	path: "settings",
					// 	element: (
					// 		<AccessibleBy permission={"Settings"}>
					// 			<SettingsPage />
					// 		</AccessibleBy>
					// 	),
					// },
				],
			},
		],
	},
]);
