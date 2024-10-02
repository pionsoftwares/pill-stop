import { api } from ".";
import appConfig from "../../config";

const studentApi = api.enhanceEndpoints({ addTagTypes: [appConfig.sessionKeys.students] }).injectEndpoints({
	endpoints: (builder) => ({
		createStudent: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "POST",
				body,
			}),
			invalidatesTags: [appConfig.sessionKeys.students],
		}),
		updateStudent: builder.mutation({
			query: (params, body) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "PUT",
				params,
				body,
			}),
			invalidatesTags: [appConfig.sessionKeys.students],
		}),
		getAllStudents: builder.query({
			query: (params) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "GET",
				params,
			}),
			providesTags: [appConfig.sessionKeys.students],
		}),
		getStudentById: builder.query({
			query: (params) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "GET",
				params,
			}),
			providesTags: [appConfig.sessionKeys.students],
		}),
		getCurrentStudent: builder.query({
			query: (params) => ({
				url: "/current/student", // Use centralized endpoint
				method: "GET",
				params,
			}),
			providesTags: [appConfig.sessionKeys.students],
		}),
	}),
});

export const {
	useCreateStudentMutation,
	useGetAllStudentsQuery,
	useGetCurrentStudentQuery,
	useGetStudentByIdQuery,
	useLazyGetAllStudentsQuery,
	useLazyGetCurrentStudentQuery,
	useLazyGetStudentByIdQuery,
	useUpdateStudentMutation,
} = studentApi;
