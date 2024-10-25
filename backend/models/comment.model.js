const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
