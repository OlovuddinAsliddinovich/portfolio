const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../validation/auth.validation");
const userRoute = require("express").Router();

userRoute.post("/register", registerValidation, AuthController.register);
userRoute.post("/login", loginValidation, AuthController.login);
userRoute.post("/logout", AuthController.logout);
userRoute.get("/refresh", AuthController.refresh);
userRoute.get("/get-user", authMiddleware, AuthController.getUser);
userRoute.patch("/update-user", authMiddleware, AuthController.updateUser);

module.exports = userRoute;
