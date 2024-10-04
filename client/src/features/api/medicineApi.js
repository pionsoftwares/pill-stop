import { api } from ".";
import appConfig from "../../config";

const medicineApi = api.enhanceEndpoints({ addTagTypes: ["MEDICINE"] }).injectEndpoints({
	endpoints: (builder) => ({
		requestMedicine: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "POST",
				body,
			}),
			invalidatesTags: ["MEDICINE"],
		}),
		getStudentRequest: builder.query({
			query: () => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "GET",
			}),
			providesTags: ["MEDICINE"],
		}),
		getAdminRequest: builder.query({
			query: () => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "GET",
			}),
			providesTags: ["MEDICINE"],
		}),
		approveRequest: builder.mutation({
			query: (params) => {
				const url = `/approve${appConfig.apiEndpoints.requestMedicine}/${params?.medicineRequestId}`;
				return {
					url,
					method: "PUT",
				};
			},
			invalidatesTags: ["MEDICINE"],
		}),
		rejectRequest: builder.mutation({
			query: ({ id, body }) => {
				const url = `/reject${appConfig.apiEndpoints.requestMedicine}/${id}`;
				return {
					url,
					method: "PUT",
					body,
				};
			},
			invalidatesTags: ["MEDICINE"],
		}),
	}),
});

export const {
	useRequestMedicineMutation,
	useApproveRequestMutation,
	useGetAdminRequestQuery,
	useGetStudentRequestQuery,
	useLazyGetAdminRequestQuery,
	useLazyGetStudentRequestQuery,
	useRejectRequestMutation,
} = medicineApi;
