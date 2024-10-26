const courseModuleRoute = require("express").Router();
const CourseModuleController = require("../controllers/course.module.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

courseModuleRoute.post(
  "/:courseId/create",
  adminAuthMiddleware,
  adminMiddleware,
  CourseModuleController.create
);

courseModuleRoute.patch(
  "/:courseId/update/:moduleId",
  adminAuthMiddleware,
  adminMiddleware,
  CourseModuleController.update
);

courseModuleRoute.get("/:courseId/get-all", CourseModuleController.getAll);

courseModuleRoute.get(
  "/:courseId/get-one/:moduleId",
  CourseModuleController.getOne
);

courseModuleRoute.delete(
  "/:courseId/delete/:moduleId",
  adminAuthMiddleware,
  adminMiddleware,
  CourseModuleController.deleteModule
);

module.exports = courseModuleRoute;
