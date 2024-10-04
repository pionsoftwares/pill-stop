import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { palette } from "../styles/__palette";

const ProvidesTheme = ({ children }) => {
	const color = palette;
	const colorTransition = "background-color 0.3s ease, color 0.3s ease";
	const theme = createTheme({
		typography: {
			fontFamily: ["Poppins", "Helvetica Neue", "Arial", "sans-serif"].join(","),
		},

		palette: {
			...color,
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					"@global": {
						body: {
							transition: colorTransition,
						},
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 50,
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 20,
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						".MuiOutlinedInput-root": {
							borderRadius: 50,
						},
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}{" "}
		</ThemeProvider>
	);
};

export default ProvidesTheme;
