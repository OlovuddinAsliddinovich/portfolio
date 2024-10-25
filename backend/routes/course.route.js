const CourseController = require("../controllers/course.controller");

const courseRoute = require("express").Router();

const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

courseRoute.get("/get-all", CourseController.getAllCourses);
courseRoute.post(
  "/create",
  adminAuthMiddleware,
  adminMiddleware,
  CourseController.create
);

courseRoute.get("/get-one/:id", CourseController.getOneCourse);

courseRoute.patch(
  "/update/:id",
  adminAuthMiddleware,
  adminMiddleware,
  CourseController.updateCourse
);

courseRoute.delete(
  "/delete/:id",
  adminAuthMiddleware,
  adminMiddleware,
  CourseController.deleteCourse
);

module.exports = courseRoute;
