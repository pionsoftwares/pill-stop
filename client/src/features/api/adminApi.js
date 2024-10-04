import { api } from ".";
import appConfig from "../../config";

const adminApi = api.enhanceEndpoints({ addTagTypes: ["ADMIN"] }).injectEndpoints({
	endpoints: (builder) => ({
		createAdmin: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.admin, // Use centralized endpoint
				method: "POST",
				body,
			}),
			invalidatesTags: ["ADMIN"],
		}),
		updateAdmin: builder.mutation({
			query: (body) => {
				return {
					url: `${appConfig.apiEndpoints.admin}`, // Use centralized endpoint
					method: "PUT",
					body: body,
				};
			},
			invalidatesTags: ["ADMIN"],
		}),
	}),
});

export const { useCreateAdminMutation, useUpdateAdminMutation } = adminApi;
