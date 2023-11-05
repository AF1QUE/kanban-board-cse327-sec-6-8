import { apiSlice } from "../api/apiSlice";

export const ListsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAlist: builder.mutation({
      query: (data) => ({
        url: "/lists",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["createlist"],
    }),
    getAllLists: builder.query({
      query: () => "/lists",
      providesTags: [
        "createtask",
        "updatetask",
        "deletetask",
        "createlist",
        "updatelist",
        "deletelist",
      ],
    }),
    getListById: builder.query({
      query: (id) => `/lists/${id}`,
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
    updateListById: builder.mutation({
      query: (body) => ({
        url: `/lists/${body?.id}`,
        method: "PUT",
        body: body?.data,
      }),
      invalidatesTags: ["updatelist", "updatetask"],
    }),
    deleteAlist: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deletelist"],
    }),
  }),
});

export const {
  useCreateAlistMutation,
  useGetAllListsQuery,
  useGetListByIdQuery,
  useUpdateListByIdMutation,
  useDeleteAlistMutation,
} = ListsApi;
