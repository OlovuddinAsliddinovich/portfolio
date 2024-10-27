const videoRoute = require("express").Router();
const VideoController = require("../controllers/video.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

videoRoute.post(
  "/:courseId/module/:moduleId/add-video",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.addVideo
);

videoRoute.patch(
  "/:courseId/module/:moduleId/update-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.updateVideo
);

videoRoute.get(
  "/:courseId/module/:moduleId/get-video/:videoId",
  VideoController.getVideo
);

videoRoute.delete(
  "/:courseId/module/:moduleId/delete-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.deleteVideo
);

module.exports = videoRoute;
