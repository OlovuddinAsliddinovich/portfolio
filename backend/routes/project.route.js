const ProjectController = require("../controllers/project.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");
const projectRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management
 */

/**
 * @swagger
 *  /api/projects/create:
 *    post:
 *      tags: [Project]
 *      summary: Create a new project
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
 *                  description: Title of the project
 *                description:
 *                  type: string
 *                  description: Description of the project
 *                duration:
 *                  type: string
 *                  description: Duration of the project
 *                lesson_count:
 *                  type: number
 *                  description: Lesson count of the project
 *                image:
 *                  type: string
 *                  description: Image URL for the project
 *                technologies:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: Technologies used in the project
 *                rating:
 *                  type: number
 *                  description: Rating of the project
 *                price:
 *                  type: number
 *                  description: Price of the project
 *                comment_count:
 *                  type: number
 *                  description: Comment count of the project
 *                directionCategory:
 *                  type: string
 *                  description: Direction category of the project
 *                  enum: ["Front-End", "Back-End", "Full-Stack", "Data Science", "Mobile"]
 *                ratingCategory:
 *                  type: string
 *                  description: Rating category of the project
 *                  enum: ["Loyiha"]
 *                priceCategory:
 *                  type: string
 *                  description: Price category of the project
 *                  enum: ["Bepul", "Pullik"]
 *      responses:
 *        201:
 *          description: Project created successfully
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Internal Server Error
 */
projectRoute.post(
  "/create",
  adminAuthMiddleware,
  adminMiddleware,
  ProjectController.create
);

/**
 * @swagger
 *  /api/projects/get-all:
 *    get:
 *      tags: [Project]
 *      summary: Get all projects
 *      responses:
 *        200:
 *          description: List of projects
 *        500:
 *          description: Internal Server Error
 */
projectRoute.get("/get-all", ProjectController.getAllProjects);

/**
 * @swagger
 *  /api/projects/get-one/{projectId}:
 *    get:
 *      tags: [Project]
 *      summary: Get a project by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the project
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Project data
 *        404:
 *          description: Project not found
 *        500:
 *          description: Internal Server Error
 */
projectRoute.get("/get-one/:projectId", ProjectController.getOneProject);

/**
 * @swagger
 * /api/project/update/{projectId}:
 *   patch:
 *     tags: [Project]
 *     summary: Update a project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the project
 *               description:
 *                 type: string
 *                 description: Description of the project
 *               duration:
 *                 type: string
 *                 description: Duration of the project
 *               image:
 *                 type: string
 *                 description: Image of the project
 *               lesson_count:
 *                 type: number
 *                 description: Lesson count of the project
 *               technology:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Technology of the project
 *               rating:
 *                 type: number
 *                 description: Rating of the project
 *               price:
 *                 type: number
 *                 description: Price of the project
 *               comment_count:
 *                 type: number
 *                 description: Comment count of the project
 *               direction_category:
 *                 type: string
 *                 description: Direction category of the project
 *                 enum: ["Front-End", "Back-End", "Full-Stack", "Data Science", "Mobile"]
 *               rating_category:
 *                 type: string
 *                 description: Rating category of the project
 *                 enum: ["Loyiha"]
 *               price_category:
 *                 type: string
 *                 description: Price category of the project
 *                 enum: ["Bepul", "Pullik"]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
projectRoute.patch(
  "/update/:projectId",
  adminAuthMiddleware,
  adminMiddleware,
  ProjectController.updateProject
);

/**
 * @swagger
 *  /api/projects/delete/{projectId}:
 *    delete:
 *      tags: [Project]
 *      summary: Delete a project by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the project
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        204:
 *          description: Project deleted successfully
 *        404:
 *          description: Project not found
 *        500:
 *          description: Internal Server Error
 */
projectRoute.delete(
  "/delete/:projectId",
  adminAuthMiddleware,
  adminMiddleware,
  ProjectController.deleteProject
);

/**
 * @swagger
 *  /api/projects/{projectId}/enroll:
 *    post:
 *      tags: [Project]
 *      summary: Enroll a project by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the project
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: Project enrolled successfully
 *        404:
 *          description: Project not found
 *        500:
 *          description: Internal Server Error
 */

projectRoute.post(
  "/:projectId/enroll",
  authMiddleware,
  ProjectController.enrollProject
);

module.exports = projectRoute;
