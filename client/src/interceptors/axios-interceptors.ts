import axios, { AxiosRequestConfig } from "axios";
import {
  errorHandleHttp,
  updateNotification,
  loadingNofication,
  errorNotifications,
} from "@/helpers";

export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

export const axiosInterceptors = () => {
  axiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorMessage = errorHandleHttp(error);
      errorNotifications(errorMessage);
      return Promise.reject(error);
    }
  );
};
