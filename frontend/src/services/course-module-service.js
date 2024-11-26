import { adminApi, apiSimple, BASE_URL } from "./admin.api";

const courseModuleService = {
  createModule: async (data, id) => {
    const response = await adminApi.post(`${BASE_URL}/course-module/${id}/create`, data);
    return response;
  },
  getModules: async (courseId) => {
    const response = await apiSimple.get(`${BASE_URL}/course-module/${courseId}/get-all`);
    return response;
  },

  getOneModule: async (courseId, moduleId) => {
    const response = await apiSimple.get(`${BASE_URL}/course-module/${courseId}/get-one/${moduleId}`);
    return response;
  },

  updateModule: async (data, courseId, moduleId) => {
    const response = await adminApi.patch(`${BASE_URL}/course-module/${courseId}/update/${moduleId}`, data);
    return response;
  },

  deleteModule: async (courseId, moduleId) => {
    const response = await adminApi.delete(`${BASE_URL}/course-module/${courseId}/delete/${moduleId}`);
    return response;
  },
};

export default courseModuleService;
