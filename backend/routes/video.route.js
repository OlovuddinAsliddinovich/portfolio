const videoRoute = require("express").Router();
const VideoController = require("../controllers/video.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Video
 *   description: Video management
 */

/**
 * @swagger
 * /api/videos/course/{refId}/modules/{moduleId}/add-video:
 *   post:
 *     summary: Add a video to a course module
 *     tags: [Video]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               videoFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video added successfully
 *       500:
 *         description: Internal Server Error
 */
videoRoute.post(
  "/course/:refId/modules/:moduleId/add-video",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.addVideoCourse
);

/**
 * @swagger
 * /api/videos/project/{refId}/add-video:
 *   post:
 *     summary: Add a video to a project
 *     tags: [Video]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               videoFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video added successfully
 *       500:
 *         description: Internal Server Error
 */
videoRoute.post(
  "/project/:refId/add-video",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.addVideoProject
);

/**
 * @swagger
 * /api/videos/course/{refId}/modules/{moduleId}/update-video/{videoId}:
 *   patch:
 *     summary: Update a video in a course module
 *     tags: [Video]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module
 *         schema:
 *           type: string
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               videoFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       500:
 *         description: Internal Server Error
 */
videoRoute.patch(
  "/course/:refId/modules/:moduleId/update-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.updateVideoCourse
);

/**
 * @swagger
 * /api/videos/project/{refId}/update-video/{videoId}:
 *   patch:
 *     summary: Update a video in a project
 *     tags: [Video]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: string
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               videoFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       500:
 *         description: Internal Server Error
 */
videoRoute.patch(
  "/project/:refId/update-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.updateVideoProject
);

/**
 * @swagger
 * /api/videos/course/{refId}/modules/{moduleId}/get-video/{videoId}:
 *   get:
 *     summary: Get a video from a course module
 *     tags: [Video]
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module
 *         schema:
 *           type: string
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal Server Error
 */
videoRoute.get(
  "/course/:refId/modules/:moduleId/get-video/:videoId",
  VideoController.getVideoCourse
);

/**
 * @swagger
 * /api/videos/project/{refId}/get-video/{videoId}:
 *   get:
 *     summary: Get a video from a project
 *     tags: [Video]
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: string
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal Server Error
 */
videoRoute.get(
  "/project/:refId/get-video/:videoId",
  VideoController.getVideoProject
);

/**
 * @swagger
 * /api/videos/course/{refId}/modules/{moduleId}/delete-video/{videoId}:
 *   delete:
 *     summary: Delete a video from a course module
 *     tags: [Video]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module
 *         schema:
 *           type: string
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal Server Error
 */
videoRoute.delete(
  "/course/:refId/modules/:moduleId/delete-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.deleteVideoCourse
);

/**
 * @swagger
 * /api/videos/project/{refId}/delete-video/{videoId}:
 *   delete:
 *     summary: Delete a video from a project
 *     tags: [Video]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: refId
 *         in: path
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: string
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: The ID of the video
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal Server Error
 */
videoRoute.delete(
  "/project/:refId/delete-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.deleteVideoProject
);

module.exports = videoRoute;
