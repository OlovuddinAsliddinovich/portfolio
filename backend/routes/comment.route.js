const commentRoute = require("express").Router();
const CommentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const checkEnrollment = require("../middlewares/check.enrollment");

commentRoute.post(
  "/:courseId/comment",
  authMiddleware,
  checkEnrollment,
  CommentController.writeComment
);

module.exports = commentRoute;
