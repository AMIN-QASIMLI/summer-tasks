import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInstance";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Note"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({ url: "todos", method: "get" }),
      providesTags: ["Note"],
    }),
    addNote: builder.mutation({
      query: (note) => ({ url: "todos", method: "post", data: note }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({ url: `todos/${id}`, method: "delete" }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: "put",
        data: patch,
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useLazyGetNotesQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = notesApi;
