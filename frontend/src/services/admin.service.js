import { apiSimple } from "./admin.api";

export const adminService = {
  login: async (payload) => {
    const { data } = await apiSimple.post("/admin/login", payload);
    return data;
  },
};
