import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crudcrud.com/api/fd4e19baf85d4ea391e75dec686d2c00",
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
    data?: [];
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
    } catch (axiosError) {
      const err = axiosError as any;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
