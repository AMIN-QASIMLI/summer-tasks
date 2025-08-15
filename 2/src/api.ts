import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({
    url,
    method,
    data,
    params,
  }: {
    url: string;
    method: "get" | "post" | "put" | "delete" | "patch";
    data?: object;
    params?: any;
  }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export type Note = {
  id: number;
  title: string;
  name: string;
  lifetime: null;
  userId: number;
  completed: boolean;
};

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["Todo"],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => ({ url: "/todos", method: "get" }),
      providesTags: ["Todo"],
    }),
    addNote: builder.mutation<Note, Omit<Note, "id">>({
      query: (note) => ({ url: "/todos", method: "post", data: note }),
      invalidatesTags: ["Todo"],
    }),
    updateNote: builder.mutation<Note, Note>({
      query: ({ id, ...note }) => ({
        url: `/todos/${id}`,
        method: "put",
        data: note,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteNote: builder.mutation<void, number>({
      query: (id) => ({ url: `/todos/${id}`, method: "delete" }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useLazyGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
