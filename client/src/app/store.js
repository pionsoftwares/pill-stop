import { configureStore } from "@reduxjs/toolkit";
import slice from "../features/slices/slice";
import authSlice from "../features/slices/authSlice";
import { api } from "../features/api";

export default configureStore({
	reducer: {
		slice: slice,
		auth: authSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([api.middleware]),
});
