import { apiSimple } from "./admin.api";

export const courseService = {
  getCourses: async () => {
    const response = await apiSimple.get("/course/get-all");
    return response;
  },
};
