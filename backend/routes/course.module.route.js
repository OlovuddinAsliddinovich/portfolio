const CourseModuleController = require("../controllers/course.module.controller");
const courseModuleRoute = require("express").Router();
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

/**
 * @swagger
 * tags:
 *   name: CourseModule
 *   description: Course module management
 */

/**
 * @swagger
 *  /api/course-module/{courseId}/create:
 *    post:
 *      tags: [CourseModule]
 *      summary: Create a new course module
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: Title of the module
 *                videos:
 *                  type: array
 *                  description: List of video IDs related to the module
 *                  items:
 *                    type: string
 *      responses:
 *        201:
 *          description: Course module created successfully
 *        400:
 *          description: Bad Request
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Internal Server Error
 */
courseModuleRoute.post(
  "/:courseId/create",
  adminAuthMiddleware,
  adminMiddleware,
  CourseModuleController.create
);

/**
 * @swagger
 *  /api/course-module/{courseId}/get-all:
 *    get:
 *      tags: [CourseModule]
 *      summary: Get all course modules
 *      responses:
 *        200:
 *          description: List of course modules
 *        500:
 *          description: Internal Server Error
 */
courseModuleRoute.get("/:courseId/get-all", CourseModuleController.getAll);

/**
 * @swagger
 *  /api/course-module/{courseId}/get-one/{moduleId}:
 *    get:
 *      tags: [CourseModule]
 *      summary: Get a course module by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the course module
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Course module data
 *        404:
 *          description: Course module not found
 *        500:
 *          description: Internal Server Error
 */
courseModuleRoute.get(
  "/:courseId/get-one/:moduleId",
  CourseModuleController.getOne
);

/**
 * @swagger
 *  /api/course-module/{courseId}/update/{moduleId}:
 *    patch:
 *      tags: [CourseModule]
 *      summary: Update a course module by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the course module
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: Updated title of the module
 *                videos:
 *                  type: array
 *                  description: Updated list of video IDs related to the module
 *                  items:
 *                    type: string
 *      responses:
 *        200:
 *          description: Course module updated successfully
 *        404:
 *          description: Course module not found
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
courseModuleRoute.patch(
  "/:courseId/update/:moduleId",
  adminAuthMiddleware,
  adminMiddleware,
  CourseModuleController.update
);

/**
 * @swagger
 *  /api/course-module/{courseId}/delete/{moduleId}:
 *    delete:
 *      tags: [CourseModule]
 *      summary: Delete a course module by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the course module
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        204:
 *          description: Course module deleted successfully
 *        404:
 *          description: Course module not found
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Internal Server Error
 */
courseModuleRoute.delete(
  "/:courseId/delete/:moduleId",
  adminAuthMiddleware,
  adminMiddleware,
  CourseModuleController.deleteModule
);

module.exports = courseModuleRoute;
