const { model, Schema } = require("mongoose");

const codeResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const CodeResource = model("CodeResource", codeResourceSchema);

module.exports = CodeResource;
