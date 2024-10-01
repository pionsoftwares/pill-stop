import { Box, TextField, InputAdornment } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";

const YourComponent = () => {
	return (
		<Box>
			<Box className="symptoms" sx={{ backgroundColor: (theme) => theme.palette.primary.main, padding: "2rem" }}>
				<TextField
					label="How are you feeling?"
					type="search"
					fullWidth
					variant="filled"
					size="small"
					placeholder="Nausea, vomiting, cramps"
					slotProps={{
						formHelperText: {
							sx: {
								color: "white",
							},
						},
						input: {
							sx: {
								backgroundColor: "white",
								"&.Mui-focused": {
									backgroundColor: "primary.contrastText",
								},
							},
							endAdornment: (
								<InputAdornment position="start">
									<SearchRounded />
								</InputAdornment>
							),
						},
					}}
				/>
			</Box>
		</Box>
	);
};

export default YourComponent;
