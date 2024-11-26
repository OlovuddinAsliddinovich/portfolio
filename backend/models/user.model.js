const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    enrolledProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
