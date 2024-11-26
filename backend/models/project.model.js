const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true, default: 0 },
    lesson_count: { type: Number, required: true, default: 0 },
    image: { type: String, default: "" },
    technologies: [String],
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    comment_count: { type: Number, default: 0 },
    slug: { type: String, default: "" },
    directionCategory: {
      type: String,
      enum: ["Front-End", "Back-End", "Full-Stack", "Data Science", "Mobile"],
      default: "",
    },
    ratingCategory: {
      type: String,
      enum: ["Boshlang'ich", "O'rta", "Murakkab"],
      default: "Loyiha",
    },
    priceCategory: {
      type: String,
      enum: ["Bepul", "Pullik"],
      default: "Bepul",
    },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

module.exports = Project;
