import axios from "axios";
import userService from "./user.service";

export const API_URL_AUTH = "https://portfolio-backend-vwqv.onrender.com/api";

export const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL_AUTH,
});

export const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL_AUTH}/auth`,
});

$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
});

$axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await $axios.get("/refresh");
        localStorage.setItem("accessToken", data.accessToken);
        return $axios.request(originalRequest);
      } catch (error) {
        console.log("Not authorized!");
        localStorage.removeItem("accessToken");
        await userService.logout();
      }
    }
    throw error;
  }
);
