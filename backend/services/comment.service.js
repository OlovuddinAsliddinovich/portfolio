const BaseError = require("../errors/base.error");
const Comment = require("../models/comment.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");
class CommentService {
  async writeComment(coment, courseId, userId) {
    const { text, rating } = coment;

    const user = await User.findById(userId);
    if (!user) return BaseError.BadRequest("User not found!");

    const course = await Course.findById(courseId);
    if (!course) return BaseError.BadRequest("Course not found!");

    const newComment = {
      text,
      rating,
      user: userId,
      course: courseId,
    };
    const comment = await Comment.create(newComment);

    course.comments.push(comment._id);
    course.comment_count += 1;
    await course.save();

    return comment;
  }

  async getAll(courseId) {
    const course = await Course.findById(courseId).populate("comments");
    if (!course) throw BaseError.BadRequest("Course not found!");

    return course.comments;
  }

  async deleteComment(courseId, commentId) {
    const course = await Course.findById(courseId);
    if (!course) throw BaseError.BadRequest("Course not found!");

    const deletedCommentIndex = course.comments.findIndex(
      (com) => com.toString() === commentId
    );
    course.comments.splice(deletedCommentIndex, 1);
    await course.save();

    const deleteComment = await Comment.findByIdAndDelete(commentId);
    return deleteComment;
  }
}

module.exports = new CommentService();
