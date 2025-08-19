import axios from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

interface AxiosRequest {
  url: string;
  method: "get" | "post" | "delete" | "put" | "patch";
  data?: any;
  params?: any;
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequest, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios({
        url: "http://localhost:4000" + url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        },
      };
    }
  };
