import { adminApi, apiSimple, BASE_URL } from "./admin.api";
import { $axios } from "./api";

export const projectService = {
  getProjects: async () => {
    const response = await apiSimple.get("/projects/get-all");
    return response;
  },
  addProject: async (data) => {
    return await adminApi.post(`${BASE_URL}/projects/create`, data);
  },

  getOneProject: async (id) => {
    return await apiSimple.get(`${BASE_URL}/projects/get-one/${id}`);
  },

  updateProject: async (data, id) => {
    return await adminApi.patch(`${BASE_URL}/projects/update/${id}`, data);
  },

  deleteProject: async (id) => {
    return await adminApi.delete(`${BASE_URL}/projects/delete/${id}`);
  },

  enrollProject: async (projectId) => {
    const response = await $axios.post(`/projects/${projectId}/enroll`);
    return response;
  },
};
