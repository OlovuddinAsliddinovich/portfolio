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
}

module.exports = new CommentService();
