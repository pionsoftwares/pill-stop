import { createSlice } from "@reduxjs/toolkit";
import { decrypt } from "../../utils/encrypt";

const { decryptedData: decryptedToken } = decrypt(sessionStorage.getItem("TOKEN"));
const { decryptedData: userData } = decrypt(sessionStorage.getItem("user"));
const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: !!decryptedToken,
		token: decryptedToken,
		user: userData,
	},
	reducers: {
		loginSlice: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		logoutSlice: (state) => {
			state.isAuthenticated = false;
			state.token = null;
		},
	},
});

export const { loginSlice, logoutSlice } = authSlice.actions;
export default authSlice.reducer;
