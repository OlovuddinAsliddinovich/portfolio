import { adminApi, apiSimple, BASE_URL } from "./admin.api";

export const codeResourceService = {
  addCodeResource: async (data) => {
    return await adminApi.post(`${BASE_URL}/code-resource/create`, data);
  },
  getAllCodeResources: async () => {
    return await apiSimple.get(`${BASE_URL}/code-resource/get-all`);
  },

  getCodeResource: async (id) => {
    return await apiSimple.get(`${BASE_URL}/code-resource/get-one/${id}`);
  },
  updateCodeResource: async (data, id) => {
    return await adminApi.patch(`${BASE_URL}/code-resource/update/${id}`, data);
  },
  deleteCodeResource: async (id) => {
    return await adminApi.delete(`${BASE_URL}/code-resource/delete/${id}`);
  },
};
