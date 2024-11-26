const CourseController = require("../controllers/course.controller");
const courseRoute = require("express").Router();
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course management
 */

/**
 * @swagger
 * /api/course/get-all:
 *   get:
 *     tags: [Course]
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Internal Server Error
 */
courseRoute.get("/get-all", CourseController.getAllCourses);

/**
 * @swagger
 * /api/course/create:
 *   post:
 *     tags: [Course]
 *     summary: Create a new course
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
 *                 description: Title of the course
 *               description:
 *                 type: string
 *                 description: Description of the course
 *               duration:
 *                 type: string
 *                 description: Duration of the course
 *               image:
 *                 type: string
 *                 description: Image of the course
 *               lesson_count:
 *                 type: number
 *                 description: Lesson count of the course
 *               technology:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Technology of the course
 *               rating:
 *                 type: number
 *                 description: Rating of the course
 *               price:
 *                 type: number
 *                 description: Price of the course
 *               comment_count:
 *                 type: number
 *                 description: Comment count of the course
 *               directionCategory:
 *                 type: string
 *                 description: Direction category of the project
 *                 enum: ["Front-End", "Back-End", "Full-Stack", "Data Science", "Mobile"]
 *               ratingCategory:
 *                 type: string
 *                 description: Rating category of the project
 *                 enum: ["Loyiha"]
 *               priceCategory:
 *                 type: string
 *                 description: Price category of the project
 *                 enum: ["Bepul", "Pullik"]
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
courseRoute.post(
  "/create",
  adminAuthMiddleware,
  adminMiddleware,
  CourseController.create
);

/**
 * @swagger
 * /api/course/get-one/{slug}:
 *   get:
 *     tags: [Course]
 *     summary: Get a course by Slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: slug of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course data
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
courseRoute.get("/get-one/:slug", CourseController.getOneCourse);

/**
 * @swagger
 * /api/course/update/{id}:
 *   patch:
 *     tags: [Course]
 *     summary: Update a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course
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
 *                 description: Title of the course
 *               description:
 *                 type: string
 *                 description: Description of the course
 *               duration:
 *                 type: string
 *                 description: Duration of the course
 *               image:
 *                 type: string
 *                 description: Image of the course
 *               lesson_count:
 *                 type: number
 *                 description: Lesson count of the course
 *               technology:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Technology of the course
 *               rating:
 *                 type: number
 *                 description: Rating of the course
 *               price:
 *                 type: number
 *                 description: Price of the course
 *               comment_count:
 *                 type: number
 *                 description: Comment count of the course
 *               directionCategory:
 *                 type: string
 *                 description: Direction category of the project
 *                 enum: ["Front-End", "Back-End", "Full-Stack", "Data Science", "Mobile"]
 *               ratingCategory:
 *                 type: string
 *                 description: Rating category of the project
 *                 enum: ["Loyiha"]
 *               priceCategory:
 *                 type: string
 *                 description: Price category of the project
 *                 enum: ["Bepul", "Pullik"]
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
courseRoute.patch(
  "/update/:id",
  adminAuthMiddleware,
  adminMiddleware,
  CourseController.updateCourse
);

/**
 * @swagger
 * /api/course/delete/{id}:
 *   delete:
 *     tags: [Course]
 *     summary: Delete a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
courseRoute.delete(
  "/delete/:id",
  adminAuthMiddleware,
  adminMiddleware,
  CourseController.deleteCourse
);

/**
 * @swagger
 * /api/course/{courseId}/enroll:
 *   post:
 *     tags: [Course]
 *     summary: Enroll in a course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course to enroll in
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully enrolled in the course
 *       403:
 *         description: Forbidden, user does not have permission to enroll
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
courseRoute.post(
  "/:courseId/enroll",
  authMiddleware,
  CourseController.enrollCourse
);

module.exports = courseRoute;
