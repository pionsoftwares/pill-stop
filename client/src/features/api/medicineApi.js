import { api } from ".";
import appConfig from "../../config";

const medicineApi = api.enhanceEndpoints({ addTagTypes: [appConfig.sessionKeys.medicine] }).injectEndpoints({
	endpoints: (builder) => ({
		requestMedicine: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "POST",
				body,
			}),
			invalidatesTags: [appConfig.sessionKeys.medicine],
		}),
		getStudentRequest: builder.query({
			query: () => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "GET",
			}),
			providesTags: [appConfig.sessionKeys.medicine],
		}),
		getAdminRequest: builder.query({
			query: () => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "GET",
			}),
			providesTags: [appConfig.sessionKeys.medicine],
		}),
		approveRequest: builder.mutation({
			query: (params) => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "PUT",
				params,
			}),
			providesTags: [appConfig.sessionKeys.medicine],
		}),
		rejectRequest: builder.mutation({
			query: (params) => ({
				url: appConfig.apiEndpoints.requestMedicine, // Use centralized endpoint
				method: "PUT",
				params,
			}),
			invalidatesTags: [appConfig.sessionKeys.medicine],
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
