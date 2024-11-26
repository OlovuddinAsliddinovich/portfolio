const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    refModel: { type: String, enum: ["Course", "Project"], required: true },
    refId: { type: Schema.Types.ObjectId, required: true, refPath: "refModel" },
    rating: { type: Number, min: 1, max: 5 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
