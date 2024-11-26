const { model, Schema } = require("mongoose");

const tokenSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

const Token = model("Token", tokenSchema);

module.exports = Token;
