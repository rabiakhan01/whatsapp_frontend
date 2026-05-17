import axios from "axios";
import { useAuthStore } from "./features/useAuthStore";
import { baseURL } from "./apiEndPoints";

export const axiosInstance = axios.create({
  baseURL,
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  axios.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      console.log("error from https", error);
      if (!navigator.onLine) {
        console.log("No internet connection");
      }
      if (error?.response?.status === 401) {
        useAuthStore.getState().logout();
        useAuthStore.persist.clearStorage();
      }
      return Promise.reject(error);
    },
  );
};
