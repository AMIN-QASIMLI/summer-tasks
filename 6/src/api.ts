import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInstance";
import type { StatLabelProps } from "@chakra-ui/react";

interface Statics {
  id: number;
  name: string;
  country: string;
  joined: string;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
}

export const staticsApi = createApi({
  reducerPath: "StaticsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Statics"],
  endpoints: (builder) => ({
    getStatics: builder.query<Statics[], void>({
      query: () => ({ url: "/users", method: "get" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Statics" as const, id })),
              { type: "Statics", id: "LIST" },
            ]
          : [{ type: "Statics", id: "LIST" }],
    }),

    getStats: builder.query<Stats[], void>({
      query: () => ({ url: "/stats", method: "get" }),
    }),
  }),
});

export const {
  useGetStaticsQuery,
  useGetStatsQuery
} = staticsApi;
