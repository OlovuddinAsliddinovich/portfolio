const commentRoute = require("express").Router();
const CommentController = require("../controllers/comment.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const checkEnrollment = require("../middlewares/check.enrollment");

commentRoute.post(
  "/:courseId/comment",
  authMiddleware,
  checkEnrollment,
  CommentController.writeComment
);

commentRoute.get("/:courseId/comment-all", CommentController.getAll);

commentRoute.delete(
  "/:courseId/delete/:commentId",
  adminAuthMiddleware,
  adminMiddleware,
  CommentController.deleteComment
);

module.exports = commentRoute;
