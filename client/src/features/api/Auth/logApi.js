import { api } from "..";

const logApi = api.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
	endpoints: (builder) => ({
		loginStudent: builder.mutation({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),
		loginAdmin: builder.mutation({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginStudentMutation, useLoginAdminMutation } = logApi;
