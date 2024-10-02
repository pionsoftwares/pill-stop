import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logoutSlice } from "../features/slices/authSlice";
import useConfirm from "./useConfirm";

import { useNavigate } from "react-router-dom";

export const useLogout = () => {
	const dispatch = useDispatch();
	const confirm = useConfirm();
	const navigate = useNavigate();

	const handleLogout = () => {
		const logout = () => {
			return new Promise((resolve, reject) => {
				try {
					dispatch(logoutSlice());
					sessionStorage.clear();
					resolve("Logout successful");
				} catch (error) {
					reject("Logout failed");
				}
			});
		};

		confirm({
			title: "Logout  Confirmation",
			description: "You are about to log out, proceed?",
			callback: () => logout(),
		})
			.then((res) => {
				if (res.isConfirmed) {
					toast.success(`Logout Successful.`);
					navigate("/login"); // Navigate to the home page after logout
				}
			})
			.catch((error) => {
				if (error?.isConfirmed) {
					if (error?.error?.data?.message === "Unauthorized") {
						toast.success("Logout Successful.");
						return logout().then(() => {
							navigate("/login"); // Navigate to the home page after logout
						});
					} else if (error?.error?.data?.message === "Backup path not found") {
						confirm({
							title: "Logout and Backup Confirmation",
							description: "Back up path not found. Would you still want to proceed to logout?",
							callback: () => logout(),
						}).then((res) => {
							if (res.isConfirmed) {
								toast.success(res?.result?.message ? res?.result?.message : `Logout Successful.`);
								navigate("/login"); // Navigate to the home page after logout
							}
						});
					}
				}
			});
	};

	return handleLogout;
};
