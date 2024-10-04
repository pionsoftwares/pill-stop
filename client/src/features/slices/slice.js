import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	touchedData: null,
};

const slice = createSlice({
	name: "slice",
	initialState,
	reducers: {
		getData: (state, action) => {
			state.touchedData = action.payload.touchedData;
		},
	},
});
export const { getData } = slice.actions;
export default slice.reducer;
