// RequestButton.jsx
import { Button, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const RequestButton = ({ onClick, disabled }) => {
	return (
		<Tooltip title={disabled ? "Please tell me what you're feeling" : ""} arrow disableHoverListener={!disabled}>
			<span>
				<Button
					variant="contained"
					color="primary"
					size="small"
					startIcon={<AddShoppingCartIcon />}
					onClick={onClick}
					disabled={disabled}
				>
					Request
				</Button>
			</span>
		</Tooltip>
	);
};

export default RequestButton;
