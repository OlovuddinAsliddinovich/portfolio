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
}

module.exports = new CommentController();
