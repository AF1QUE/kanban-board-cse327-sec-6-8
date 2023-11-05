import { apiSlice } from "../api/apiSlice";

export const TaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createATask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["createtask"],
    }),
    getAllTasks: builder.query({
      query: () => "/tasks",
      providesTags: [
        "createtask",
        "updatetask",
        "deletetask",
        "createlist",
        "updatelist",
        "deletelist",
        "updateworkspace",
      ],
    }),
    getTasksById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: [
        "createtask",
        "updatetask",
        "deletetask",
        "createlist",
        "updatelist",
        "deletelist",
        "updateworkspace",
      ],
    }),
    updateTaskById: builder.mutation({
      query: (body) => ({
        url: `/tasks/${body?.id}`,
        method: "PUT",
        body: body?.data,
      }),
      invalidatesTags: ["updatetask", "updatelist"],
    }),
    deleteAtask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deletetask"],
    }),
  }),
});

export const {
  useCreateATaskMutation,
  useGetAllTasksQuery,
  useGetTasksByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteAtaskMutation,
} = TaskApi;
