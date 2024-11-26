import { adminApi, apiSimple, BASE_URL } from "./admin.api";

const videoService = {
  addVideoCourse: async (data, courseId, moduleId) => {
    const response = await adminApi.post(`${BASE_URL}/videos/course/${courseId}/modules/${moduleId}/add-video`, data);
    return response;
  },

  getOneVideoCourse: async (courseId, moduleId, videoId) => {
    const response = await apiSimple(`${BASE_URL}/videos/course/${courseId}/modules/${moduleId}/get-video/${videoId}`);
    return response;
  },

  updateVideoCourse: async (data, courseId, moduleId, videoId) => {
    const response = await adminApi.patch(`${BASE_URL}/videos/course/${courseId}/modules/${moduleId}/update-video/${videoId}`, data);
    return response;
  },

  deleteVideoCourse: async (courseId, moduleId, videoId) => {
    const response = await adminApi.delete(`${BASE_URL}/videos/course/${courseId}/modules/${moduleId}/delete-video/${videoId}`);
    return response;
  },

  addVideoProject: async (data, projectId) => {
    const response = await adminApi.post(`${BASE_URL}/videos/project/${projectId}/add-video`, data);
    return response;
  },

  getOneVideoProject: async (projectId, videoId) => {
    const response = await apiSimple(`${BASE_URL}/videos/project/${projectId}/get-video/${videoId}`);
    return response;
  },

  updateProject: async (data, projectId, videoId) => {
    const response = await adminApi.patch(`${BASE_URL}/videos/project/${projectId}/update-video/${videoId}`, data);
    return response;
  },

  deleteVideoProject: async (projectId, videoId) => {
    const response = await adminApi.delete(`${BASE_URL}/videos/project/${projectId}/delete-video/${videoId}`);
    return response;
  },
};

export default videoService;
