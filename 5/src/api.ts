import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInstance";

interface Product {
  id?: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  isDeletable?: boolean;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // ----- Products -----
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: "/products", method: "get" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    addProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation<Product, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "put",
        data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({ url: `/products/${id}`, method: "delete" }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    // ----- InCarts -----
    getInCarts: builder.query<Product[], void>({
      query: () => ({ url: "/inCarts", method: "get" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    addToCart: builder.mutation<Product, Product>({
      query: (product) => ({
        url: "/inCarts",
        method: "post",
        data: product, // title, price, description, image
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    removeFromCart: builder.mutation<void, number>({
      query: (id) => ({
        url: `/inCarts/${id}`,
        method: "delete",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetInCartsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = productsApi;
