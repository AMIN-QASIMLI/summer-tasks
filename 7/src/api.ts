import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInstance";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  companyName: string;
  mobile: string;
}

type UsersResponse = User[];

export const api = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query<UsersResponse, void>({
      query: () => ({ url: "/profile", method: "get" }),
    }),
    addUser: builder.mutation<UsersResponse, any>({
      query: (user) => ({ method: "post", url: "/users", data: user }),
    }),
    deleteUser: builder.mutation<UsersResponse, any>({
      query: (id) => ({ url: `/users/${id}`, method: "delete" }),
    }),
  }),
});

export const { useGetUserQuery, useAddUserMutation, useDeleteUserMutation} =
  api;
