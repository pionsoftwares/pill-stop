import React, { Fragment, createContext, useCallback, useState } from "react";

import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";

import useDisclosure from "../hooks/useDisclosure";

export const ReasonContext = createContext();

const ReasonProvider = ({ children }) => {
	const { open: isLoading, onToggle: handleLoading } = useDisclosure(false);

	const [value, setValue] = useState("");

	const [options, setOptions] = useState({
		title: "Confirmation",
		description: "Are you sure you want to void this transaction? Please note that you cannot undo this action.",
		yesText: "Yes",
		noText: "No",
	});

	const [resolveRejectCallback, setResolveRejectCallback] = useState([]);
	const [resolve, reject, callback] = resolveRejectCallback;

	const reason = useCallback((params = {}) => {
		const { callback, ...options } = params;

		return new Promise((resolve, reject) => {
			setOptions((currentValue) => ({
				...currentValue,
				...options,
			}));

			setResolveRejectCallback([resolve, reject, callback]);
		});
	}, []);

	const handleClose = useCallback(() => {
		setResolveRejectCallback([]);
		setValue("");
	}, []);

	const handleCancel = useCallback(() => {
		if (reject) {
			reject({
				isConfirmed: false,
				isCancelled: true,
				result: null,
			});
		}

		handleClose();
	}, [reject, handleClose]);

	const handleConfirm = useCallback(() => {
		if (callback) {
			handleLoading();
			callback(value)
				.then((result) =>
					resolve({
						isConfirmed: true,
						isCancelled: false,
						result: result,
					})
				)
				.catch((error) =>
					reject({
						isConfirmed: true,
						isCancelled: false,
						error: error,
					})
				)
				.finally(() => {
					handleLoading();
					handleClose();
				});
		} else if (resolve) {
			resolve({
				isConfirmed: true,
				isCancelled: false,
				result: null,
			});
			handleClose();
		}
	}, [value, resolve, reject, callback, handleClose, handleLoading]);

	return (
		<Fragment>
			<ReasonContext.Provider value={{ reason }}>{children}</ReasonContext.Provider>

			<Dialog
				open={resolveRejectCallback.length === 3}
				fullWidth
				maxWidth="sm"
				className="confirm"
				disableRestoreFocus
			>
				<DialogTitle className="confirm__title">
					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Typography variant="h6" fontWeight={700} className="confirm__title__typography">
							{options.title}
						</Typography>

						<IconButton
							aria-label="close"
							onClick={handleCancel}
							sx={{
								position: "absolute",
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<Close />
						</IconButton>
					</Stack>
				</DialogTitle>

				<DialogContent className="confirm__content">
					<Stack direction="row" alignItems="center" gap={2} marginBottom={2}>
						<Typography variant="body1" className="confirm__content__description">
							{options.description}
						</Typography>
					</Stack>
					<TextField
						label="Reason"
						placeholder="Write a valid reason."
						value={value}
						onChange={(e) => {
							const inputValue = e.target.value;
							// Set value only if it contains non-whitespace characters
							setValue(inputValue.trim() === "" ? "" : inputValue);
						}}
						fullWidth
						multiline
						autoFocus
					/>
				</DialogContent>

				<DialogActions sx={{ margin: "1rem", gap: 1 }} className="confirm__actions">
					<Button disabled={isLoading} onClick={handleCancel} size="large" variant="outlined" color="error">
						{options.noText}
					</Button>
					<Button
						size="large"
						variant="contained"
						color="secondary"
						startIcon={isLoading && <CircularProgress color="inherit" size={16} thickness={4} />}
						disabled={isLoading || !value}
						onClick={handleConfirm}
						disableElevation
					>
						{options.yesText}
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default ReasonProvider;
