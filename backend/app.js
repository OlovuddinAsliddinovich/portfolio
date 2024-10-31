const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Routers
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
const courseRoute = require("./routes/course.route");
const commentRoute = require("./routes/comment.route");
const courseModuleRoute = require("./routes/course.module.route");
const videoRoute = require("./routes/video.route");
const errorMiddleware = require("./middlewares/error.middleware");
const projectRoute = require("./routes/project.route");
const codeResourceRoute = require("./routes/code.resource");

const app = express();
dotenv.config();

// Swagger konfiguratsiyasi
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, // Server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Router fayllaringiz
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.static("static"));
app.use(express.static("courses"));
app.use(cookieParser());

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/auth", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/projects", projectRoute);
app.use("/api/comments", commentRoute);
app.use("/api/course-module", courseModuleRoute);
app.use("/api/videos", videoRoute);
app.use("/api/code-resource", codeResourceRoute);

// error middleware
app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

startApp();
