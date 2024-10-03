import { api } from ".";
import appConfig from "../../config";

const studentApi = api.enhanceEndpoints({ addTagTypes: ["STUDENT"] }).injectEndpoints({
	endpoints: (builder) => ({
		createStudent: builder.mutation({
			query: (body) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "POST",
				body,
			}),
			invalidatesTags: ["STUDENT"],
		}),
		updateStudent: builder.mutation({
			query: (params, body) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "PUT",
				params,
				body,
			}),
			invalidatesTags: ["STUDENT"],
		}),
		getAllStudents: builder.query({
			query: (params) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "GET",
				params,
			}),
			providesTags: ["STUDENT"],
		}),
		getStudentById: builder.query({
			query: (params) => ({
				url: appConfig.apiEndpoints.student, // Use centralized endpoint
				method: "GET",
				params,
			}),
			providesTags: ["STUDENT"],
		}),
		getCurrentStudent: builder.query({
			query: (params) => ({
				url: "/current/student", // Use centralized endpoint
				method: "GET",
				params,
			}),
			providesTags: ["STUDENT"],
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
