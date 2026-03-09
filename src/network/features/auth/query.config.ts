import { QueryClient } from "@tanstack/react-query";
import { showToast } from "../../../utils/utilityFns";
import { AxiosError } from "axios";

type ApiError = {
  message?: string;
  error?: {
    message?: string;
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,

      retry: (failureCount, error) => {
        const err = error as AxiosError;

        if (err?.response?.status && err.response.status >= 400 && err.response.status < 500) {
          return false;
        }

        return failureCount < 3;
      },

      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },

    mutations: {
      onError: (error) => {
        const err = error as AxiosError<ApiError>;

        const errorMsg =
          err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          "Something went wrong";

        showToast(errorMsg, "error", { position: "top-center" });
      },
    },
  },
});