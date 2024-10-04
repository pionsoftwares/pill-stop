import { Box, Card, Fade, Slide, Typography, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/LandingSlide.scss";
import logo from "../assets/Logo.svg";

const LandingSlide = ({ onComplete }) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<Slide direction="right" in={show} appear={false} mountOnEnter unmountOnExit onExited={onComplete}>
			<Card sx={{ backgroundColor: "#fff5ec" }} className="landing-slide">
				<Zoom in={true}>
					<Box className="landing-slide__container">
						<img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
					</Box>
				</Zoom>
			</Card>
		</Slide>
	);
};

export default LandingSlide;
