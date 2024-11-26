const { model, Schema } = require("mongoose");

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
