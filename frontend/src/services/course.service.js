import { adminApi, apiSimple } from "./admin.api";
import { $axios } from "./api";

export const courseService = {
  getCourses: async () => {
    const response = await apiSimple.get("/course/get-all");
    return response;
  },
  addCourse: async (data) => {
    const response = await adminApi.post("/course/create", data);
    return response;
  },

  getOneCourse: async (slug) => {
    const response = await apiSimple.get(`/course/get-one/${slug}`);
    return response;
  },

  updateCourse: async (data, id) => {
    const response = await adminApi.patch(`/course/update/${id}`, data);
    return response;
  },

  deleteCourse: async (id) => {
    const response = await adminApi.delete(`/course/delete/${id}`);
    return response;
  },

  enrollCourse: async (id) => {
    const response = await $axios.post(`/course/${id}/enroll`);
    return response;
  },
};
