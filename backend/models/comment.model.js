const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
