import { apiSimple } from "./admin.api";

export const projectService = {
  getProjects: async () => {
    const response = await apiSimple.get("/projects/get-all");
    return response;
  },
};
