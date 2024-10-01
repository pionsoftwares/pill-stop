import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import { TabValues } from "../../schemas/pages"; // Adjust the import path as necessary
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
	const location = useLocation(); // Get the current location

	const currentPath = location.pathname; // Get the current path

	// Determine the active value based on the current path
	const value =
		Object.keys(TabValues).find((key) => {
			return TabValues[key].to === currentPath;
		}) || "home";

	return (
		<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation value={value}>
				{Object.entries(TabValues)?.map(([key, item]) => {
					// Determine which icon to use based on active state
					const icon = value === key ? item.iconOn : item.icon;
					return (
						<BottomNavigationAction
							key={key}
							component={Link} // Use Link for navigation
							to={item.to} // Set the route path
							label={item.name}
							icon={icon}
							value={key} // Add value prop for active state
						/>
					);
				})}
			</BottomNavigation>
		</Paper>
	);
};

export default BottomBar;
