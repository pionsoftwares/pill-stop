import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import appConfig from "../../config";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_PILLSTOP_ENDPOINT}${appConfig.apiEndpoints.index}`,
		prepareHeaders: (headers, { getState }) => {
			headers.set("Authorization", `Bearer ` + getState().auth.token);
			headers.set("Accept", "application/json");
			return headers;
		},
	}),
	tagTypes: ["api"],
	endpoints: () => ({}),
});
