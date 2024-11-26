const BaseError = require("../errors/base.error");
const Comment = require("../models/comment.model");
const Course = require("../models/course.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");
class CommentService {
  async writeComment(coment, refModel, refId, userId) {
    const { text, rating } = coment;

    const user = await User.findById(userId);
    if (!user) return BaseError.BadRequest("User not found!");

    let targetModel;

    if (refModel === "Course") {
      targetModel = await Course.findById(refId);
    } else if (refModel === "Project") {
      targetModel = await Project.findById(refId);
    }

    const newComment = {
      text,
      refModel,
      refId,
      rating,
      user: userId,
    };
    const comment = await Comment.create(newComment);

    targetModel.comments.push(comment._id);
    targetModel.comment_count += 1;
    await targetModel.save();

    return comment;
  }

  async getAll(refModel, refId) {
    let targetModel;
    if (refModel === "Course") {
      targetModel = await Course.findById(refId).populate("comments");
      if (!targetModel) throw BaseError.BadRequest("Course not found!");
      return targetModel.comments;
    } else if (refModel === "Project") {
      targetModel = await Project.findById(refId).populate("comments");
      if (!targetModel) throw BaseError.BadRequest("Project not found!");
      return targetModel.comments;
    }

    return targetModel.comments;
  }

  async getAllComments() {
    const comments = await Comment.find().populate("user").populate("refId");
    return comments;
  }

  async deleteComment(refModel, refId, commentId) {
    let targetModel;

    if (refModel === "Course") {
      targetModel = await Course.findById(refId);
    } else if (refModel === "Project") {
      targetModel = await Project.findById(refId);
    }
    if (!targetModel) throw BaseError.BadRequest("Model not found!");

    const deletedCommentIndex = targetModel.comments.findIndex((com) => com.toString() === commentId);
    targetModel.comments.splice(deletedCommentIndex, 1);
    await targetModel.save();

    const deleteComment = await Comment.findByIdAndDelete(commentId);
    return deleteComment;
  }
}

module.exports = new CommentService();
