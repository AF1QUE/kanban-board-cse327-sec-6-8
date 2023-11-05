/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token) {
        // console.log({token})
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "createtask",
    "updatetask",
    "deletetask",
    "createlist",
    "updatelist",
    "deletelist",
    "createworkspace",
    "updateworkspace",
    "deleteworkspace",
  ],
  endpoints: (builder) => ({}),
});
