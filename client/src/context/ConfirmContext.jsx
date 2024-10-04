import React, { Fragment, createContext, useCallback, useState } from "react";

import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";

import useDisclosure from "../hooks/useDisclosure";

export const ConfirmContext = createContext();

const ConfirmProvider = ({ children }) => {
	const { open: isLoading, onToggle: handleLoading } = useDisclosure(false);

	const [options, setOptions] = useState({
		title: "Confirmation",
		description: "Are you sure? [confirm sample]",
		yesText: "Yes",
		noText: "No",
	});

	const [resolveRejectCallback, setResolveRejectCallback] = useState([]);
	const [resolve, reject, callback] = resolveRejectCallback;

	const confirm = useCallback((params = {}) => {
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
			callback()
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
	}, [resolve, reject, callback, handleClose, handleLoading]);

	return (
		<Fragment>
			<ConfirmContext.Provider value={{ confirm }}>{children}</ConfirmContext.Provider>

			<Dialog
				open={resolveRejectCallback.length === 3}
				onClose={handleCancel}
				maxWidth="xs"
				fullWidth
				className="confirm"
			>
				<DialogTitle className="confirm__title">
					<Typography fontWeight={700} className="confirm__title__typography">
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
				</DialogTitle>

				<DialogContent className="confirm__content">
					<Typography variant="body1" className="confirm__content__description">
						{options.description}
					</Typography>
				</DialogContent>

				<DialogActions sx={{ margin: "1rem", gap: 1 }} className="confirm__actions">
					<Button disabled={isLoading} onClick={handleCancel} size="large" color="error">
						{options.noText}
					</Button>
					<Button
						size="large"
						variant="contained"
						color="success"
						startIcon={isLoading && <CircularProgress color="inherit" size={16} thickness={4} />}
						disabled={isLoading}
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

export default ConfirmProvider;
