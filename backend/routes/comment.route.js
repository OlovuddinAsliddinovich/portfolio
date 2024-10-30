const commentRoute = require("express").Router();
const CommentController = require("../controllers/comment.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const checkEnrollment = require("../middlewares/check.enrollment");

commentRoute.post(
  "/:refModel/:refId/comment",
  authMiddleware,
  checkEnrollment,
  CommentController.writeComment
);

commentRoute.get("/:refModel/:refId/comments", CommentController.getAll);

commentRoute.delete(
  "/:refModel/:refId/delete/:commentId",
  adminAuthMiddleware,
  adminMiddleware,
  CommentController.deleteComment
);

module.exports = commentRoute;
