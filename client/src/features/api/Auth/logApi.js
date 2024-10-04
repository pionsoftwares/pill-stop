import { api } from "..";
import appConfig from "../../../config";

const logApi = api.enhanceEndpoints({ addTagTypes: ["USER"] }).injectEndpoints({
	endpoints: (builder) => ({
		loginStudent: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.studentLogin, // Use centralized endpoint
				method: "POST",
				body,
			}),
		}),
		loginAdmin: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.adminLogin, // Add admin login to config if needed
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginStudentMutation, useLoginAdminMutation } = logApi;
