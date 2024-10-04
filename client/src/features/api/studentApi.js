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
			query: ({ id, body }) => {
				return {
					url: `${appConfig.apiEndpoints.student}/${id}`, // Use centralized endpoint
					method: "PUT",
					body: body,
				};
			},
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
				url: `${appConfig.apiEndpoints.student}/${params.id}`, // Use centralized endpoint
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
