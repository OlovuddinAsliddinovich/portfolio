const { model, Schema } = require("mongoose");

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    url: { type: String, required: true },
    module: { type: Schema.Types.ObjectId, ref: "CourseModule" },
  },
  { timestamps: true }
);

const Video = model("Video", videoSchema);

module.exports = Video;
