const CommentService = require("../services/comment.service");
class CommentController {
  async writeComment(req, res, next) {
    try {
      const { refModel, refId } = req.params;
      const userId = req.user.id;
      const comment = await CommentService.writeComment(req.body, refModel, refId, userId);
      return res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { refModel, refId } = req.params;
      const result = await CommentService.getAll(refModel, refId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllComments(req, res, next) {
    try {
      const result = await CommentService.getAllComments();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { refModel, refId, commentId } = req.params;
      const deletedComment = await CommentService.deleteComment(refModel, refId, commentId);
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
