import { adminApi } from "./admin.api";
import { $api, $axios } from "./api";

const commentService = {
  getAllComments: async (refModel, refId) => {
    const response = await $api.get(`/comments/${refModel}/${refId}/comments`);
    return response.data;
  },

  getAll: async () => {
    const response = await adminApi.get(`/comments/all`);
    return response.data;
  },

  writeComment: async (refModel, refId, comment) => {
    const response = await $axios.post(`/comments/${refModel}/${refId}/comment`, comment);
    return response.data;
  },
  deleteComment: async (refModel, refId, commentId) => {
    const response = await adminApi.delete(`/comments/${refModel}/${refId}/delete/${commentId}`);
    return response.data;
  },
};

export default commentService;
