const { model, Schema } = require("mongoose");

const courseModuleSchema = new Schema(
  {
    title: { type: String, required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

const Module = model("CourseModule", courseModuleSchema);

module.exports = Module;
