import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import appConfig from "../../config.jsx";
import "../../styles/Navbar.scss"; // Import your SCSS file
const Navbar = () => {
	const [scrolling, setScrolling] = useState(false); // State to track if scrolling

	useEffect(() => {
		const handleScroll = () => {
			// Change the threshold value to determine how close to the top the navbar should stay visible
			const threshold = 100; // Adjust this value as needed
			if (window.scrollY > threshold) {
				setScrolling(true); // Set scrolling to true when scrolled beyond the threshold
			} else {
				setScrolling(false); // Reset when above the threshold
			}
		};

		window.addEventListener("scroll", handleScroll); // Add the scroll event listener

		return () => {
			window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
		};
	}, []);

	return (
		<Paper
			className={`navbar ${scrolling ? "fade" : ""}`}
			elevation={0}
			sx={{ backgroundColor: (theme) => theme.palette.primary.main, borderRadius: 0 }}
		>
			{" "}
			<Typography variant="title" fontWeight={"bold"} color="primary.contrastText">
				{appConfig.appName.toPascalCase().toUpperCase()}
			</Typography>
		</Paper>
	);
};

export default Navbar;
