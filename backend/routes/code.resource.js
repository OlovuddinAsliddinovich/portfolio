const CodeResourceController = require("../controllers/course.resource.controller");

const { adminAuthMiddleware, adminMiddleware } = require("../middlewares/admin.auth.middleware");

const codeResource = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: CodeResource
 *   description: Course resource management
 */

/**
 * @swagger
 *  /api/code-resource/create:
 *    post:
 *      tags: [CodeResource]
 *      summary: Create a new course resource
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
 *                url:
 *                  type: string
 *      responses:
 *        200:
 *          description: Successful operation
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal server error
 */
codeResource.post("/create", adminAuthMiddleware, adminMiddleware, CodeResourceController.createCodeResource);

/**
 * @swagger
 * /api/code-resource/get-all:
 *   get:
 *     tags: [CodeResource]
 *     summary: Get all course resources
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
codeResource.get("/get-all", CodeResourceController.getAllCodeResources);

codeResource.get("/get-one/:id", CodeResourceController.getCodeResource);
/**
 * @swagger
 * /api/code-resource/get-one/{id}:
 *   get:
 *     tags: [CodeResource]
 *     summary: Get a course resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course resource
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Course resource not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/code-resource/delete/{id}:
 *   delete:
 *     tags: [CodeResource]
 *     summary: Delete a course resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course resource
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Course resource not found
 *       500:
 *         description: Internal server error
 */
codeResource.delete("/delete/:id", adminAuthMiddleware, adminMiddleware, CodeResourceController.deleteCodeResource);

/**
 * @swagger
 * /api/code-resource/update/{id}:
 *   patch:
 *     tags: [CodeResource]
 *     summary: Update a course resource by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course resource
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
 *                 description: Title of the course resource
 *               url:
 *                 type: string
 *                 description: URL of the course resource
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
codeResource.patch("/update/:id", adminAuthMiddleware, adminMiddleware, CodeResourceController.updateCodeResource);

module.exports = codeResource;
