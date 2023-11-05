import { apiSlice } from "../api/apiSlice";

export const workSpaceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspacesListandTasks: builder.query({
      query: (id) => `/workspaces/${id}/lists`,
      providesTags: [
        "createlist",
        "updatelist",
        "deletelist",
        "createtask",
        "updatetask",
        "deletetask",
      ],
    }),

    getWorkspaces: builder.query({
      query: () => "/workspaces",
      providesTags: ["createworkspace", "updateworkspace", "deleteworkspace"],
    }),
    getSingleWorkSpaces: builder.query({
      query: (id) => `/workspaces/${id}`,
      providesTags: ["createworkspace", "updateworkspace", "deleteworkspace"],
    }),
    createWorkSpace: builder.mutation({
      query: (data) => ({
        url: "/workspaces",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["createworkspace"],
    }),
    updateWorkSpaceById: builder.mutation({
      query: (body) => ({
        url: `/workspaces/${body?.id}`,
        method: "PUT",
        body: body?.data,
      }),
      invalidatesTags: ["updateworkspace"],
    }),
    deleteWorkSpaceById: builder.mutation({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteworkspace"],
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useCreateWorkSpaceMutation,
  useGetWorkspacesListandTasksQuery,
  useUpdateWorkSpaceByIdMutation,
  useDeleteWorkSpaceByIdMutation,
  useGetSingleWorkSpacesQuery,
} = workSpaceApi;
