const projectRoute = require("express").Router();
const ProjectController = require("../controllers/project.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

projectRoute.get("/get-all", ProjectController.getAllProjects);
projectRoute.post(
  "/create",
  adminAuthMiddleware,
  adminMiddleware,
  ProjectController.create
);

projectRoute.get("/get-one/:projectId", ProjectController.getOneProject);

projectRoute.patch(
  "/update/:projectId",
  adminAuthMiddleware,
  adminMiddleware,
  ProjectController.updateProject
);

projectRoute.delete(
  "/delete/:projectId",
  adminAuthMiddleware,
  adminMiddleware,
  ProjectController.deleteProject
);

projectRoute.post(
  "/:projectId/enroll",
  authMiddleware,
  ProjectController.enrollProject
);

module.exports = projectRoute;
