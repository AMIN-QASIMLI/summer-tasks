import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://picsum.photos/",
  }),
  endpoints: (builder) => ({
    getImgs: builder.query({
      query: () => `/800/500?random=1`,
    }),
  }),
});

export const { useGetImgsQuery, useLazyGetImgsQuery } = api;
