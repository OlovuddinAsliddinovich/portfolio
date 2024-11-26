const CommentController = require("../controllers/comment.controller");
const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");
const commentRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const checkEnrollment = require("../middlewares/check.enrollment");

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management
 */

/**
 * @swagger
 *  /api/comments/{refModel}/{refId}/comments:
 *    get:
 *      tags: [Comment]
 *      summary: Get all comments
 *      responses:
 *        200:
 *          description: List of comments
 *        500:
 *          description: Internal Server Error
 */
commentRoute.get("/:refModel/:refId/comments", CommentController.getAll);

/**
 * @swagger
 *  /api/comments/all:
 *    get:
 *      tags: [Comment]
 *      summary: Get all comments
 *      responses:
 *        200:
 *          description: List of comments
 *        500:
 *          description: Internal Server Error
 */
commentRoute.get("/all", adminAuthMiddleware, adminMiddleware, CommentController.getAllComments);

/**
 * @swagger
 *  /api/comments/{refModel}/{refId}/comment/create:
 *    post:
 *      tags: [Comment]
 *      summary: Create a new comment
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                  description: Text of the comment
 *                refModel:
 *                  type: string
 *                  description: Reference model for the comment (Course or Project)
 *                  enum: ["Course", "Project"]
 *                refId:
 *                  type: string
 *                  description: ID of the referenced Course or Project
 *                rating:
 *                  type: number
 *                  description: Rating of the comment
 *                  minimum: 1
 *                  maximum: 5
 *                user:
 *                  type: string
 *                  description: ID of the user who made the comment
 *      responses:
 *        201:
 *          description: Comment created successfully
 *        400:
 *          description: Bad Request
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Internal Server Error
 */
commentRoute.post("/:refModel/:refId/comment", authMiddleware, checkEnrollment, CommentController.writeComment);

/**
 * @swagger
 *  /api/comments/{refModel}/{refId}/delete/{commentId}:
 *    delete:
 *      tags: [Comment]
 *      summary: Delete a comment by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the comment
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        204:
 *          description: Comment deleted successfully
 *        404:
 *          description: Comment not found
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Internal Server Error
 */
commentRoute.delete("/:refModel/:refId/delete/:commentId", adminAuthMiddleware, adminMiddleware, CommentController.deleteComment);

module.exports = commentRoute;
