import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000/api";

const apiSimple = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

const adminApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

adminApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("adminToken")}`;
  return config;
});

export { adminApi, apiSimple };
