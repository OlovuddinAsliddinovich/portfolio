const CommentService = require("../services/comment.service");
class CommentController {
  async writeComment(req, res, next) {
    try {
      const { courseId } = req.params;
      const userId = req.user.id;
      const comment = await CommentService.writeComment(
        req.body,
        courseId,
        userId
      );
      return res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { courseId } = req.params;
      const result = await CommentService.getAll(courseId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { courseId, commentId } = req.params;
      const deletedComment = await CommentService.deleteComment(
        courseId,
        commentId
      );
      return res.status(200).json({
        message: "Delete successfully comment!",
        deletedComment,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
