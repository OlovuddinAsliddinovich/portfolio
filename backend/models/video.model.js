const { model, Schema } = require("mongoose");

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    url: { type: String, required: true },
    refId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Video = model("Video", videoSchema);

module.exports = Video;
