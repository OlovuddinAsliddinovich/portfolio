const express = require("express");
const AdminController = require("../controllers/admin.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

const adminRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 *  /api/admin/create:
 *    post:
 *      tags: [Admin]
 *      summary: Create a new admin
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the admin
 *                password:
 *                  type: string
 *                  description: The password for the admin
 *      responses:
 *        201:
 *          description: Admin created successfully
 *        400:
 *          description: Invalid input
 *        500:
 *          description: Internal Server Error
 */
adminRoute.post("/create", AdminController.create);

/**
 * @swagger
 *  /api/admin/login:
 *    post:
 *      tags: [Admin]
 *      summary: Admin login
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: Admin's username
 *                password:
 *                  type: string
 *                  description: Admin's password
 *      responses:
 *        200:
 *          description: Admin logged in successfully
 *        401:
 *          description: Invalid credentials
 *        500:
 *          description: Internal Server Error
 */
adminRoute.post("/login", AdminController.loginAdmin);

/**
 * @swagger
 *  /api/admin/get:
 *    get:
 *      tags: [Admin]
 *      summary: Get admin data
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: Admin data retrieved successfully
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Admin not found
 */
adminRoute.get(
  "/get",
  adminAuthMiddleware,
  adminMiddleware,
  AdminController.getAdmin
);

module.exports = adminRoute;
