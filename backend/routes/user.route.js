const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { registerValidation, loginValidation } = require("../validation/auth.validation");
const userRoute = require("express").Router();
const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 *  /api/auth/register:
 *    post:
 *      tags: [Auth]
 *      summary: Register a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstname:
 *                  type: string
 *                  description: The firstname of the user
 *                lastname:
 *                  type: string
 *                  description: The lastname of the user
 *                email:
 *                  type: string
 *                  description: The email of the user
 *                password:
 *                  type: string
 *                  description: The password of the user
 *                phone:
 *                  type: string
 *                  description: The phone number of the user
 *      responses:
 *        200:
 *          description: User registered successfully
 *        400:
 *          description: Invalid input
 *        500:
 *          description: Internal Server Error
 */
userRoute.post("/register", registerValidation, AuthController.register);

/**
 * @swagger
 *  /api/auth/login:
 *    post:
 *      tags: [Auth]
 *      summary: Login user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: User's username
 *                password:
 *                  type: string
 *                  description: User's password
 *      responses:
 *        200:
 *          description: User logged in successfully
 *        401:
 *          description: Invalid credentials
 *        500:
 *          description: Internal Server Error
 */
userRoute.post("/login", loginValidation, AuthController.login);

/**
 * @swagger
 *  /api/auth/logout:
 *    post:
 *      tags: [Auth]
 *      summary: Logout user
 *      responses:
 *        200:
 *          description: User logged out successfully
 *        500:
 *          description: Internal Server Error
 */
userRoute.post("/logout", AuthController.logout);

/**
 * @swagger
 *  /api/auth/refresh:
 *    get:
 *      tags: [Auth]
 *      summary: Refresh user token
 *      responses:
 *        200:
 *          description: Token refreshed successfully
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */
userRoute.get("/refresh", AuthController.refresh);

/**
 * @swagger
 *  /api/auth/get-user:
 *    get:
 *      tags: [Auth]
 *      summary: Get logged in user
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: User data retrieved successfully
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: User not found
 */
userRoute.get("/get-user", authMiddleware, AuthController.getUser);

/**
 * @swagger
 *  /api/auth/get-all-users:
 *    get:
 *      tags: [Auth]
 *      summary: Get all users
 *      responses:
 *        200:
 *          description: List of users
 *        500:
 *          description: Internal Server Error
 */
userRoute.get("/get-all-users", adminAuthMiddleware, adminMiddleware, AuthController.getAllUsers);

/**
 * @swagger
 *  /api/auth/update-user:
 *    patch:
 *      tags: [Auth]
 *      summary: Update user data
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               firstname:
 *                  type: string
 *                  description: The new firstname for the user
 *               lastname:
 *                  type: string
 *                  description: The new lastname for the user
 *               email:
 *                  type: string
 *                  description: The new email for the user
 *               password:
 *                  type: string
 *                  description: The new password for the user
 *               phone:
 *                  type: string
 *                  description: The new phone number for the user
 *               bio:
 *                  type: string
 *                  description: The new bio for the user
 *               image:
 *                  type: string
 *                  description: The new image for the user
 *      responses:
 *        200:
 *          description: User data updated successfully
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal Server Error
 */
userRoute.patch("/update-user", authMiddleware, AuthController.updateUser);

/**
 * @swagger
 *  /api/auth/delete-user/{id}:
 *    delete:
 *      tags: [Auth]
 *      summary: Delete a user by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: User deleted successfully
 *        403:
 *          description: Forbidden
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal Server Error
 */
userRoute.delete("/delete-user/:id", adminAuthMiddleware, adminMiddleware, AuthController.deleteUser);

module.exports = userRoute;
