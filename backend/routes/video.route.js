const videoRoute = require("express").Router();
const VideoController = require("../controllers/video.controller");
const {
  adminAuthMiddleware,
  adminMiddleware,
} = require("../middlewares/admin.auth.middleware");

// Video qo'shish
videoRoute.post(
  "/course/:refId/modules/:moduleId/add-video",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.addVideoCourse
);

videoRoute.post(
  "/project/:refId/add-video",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.addVideoProject
);

// Video yangilash
videoRoute.patch(
  "/course/:refId/modules/:moduleId/update-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.updateVideoCourse
);

videoRoute.patch(
  "/project/:refId/update-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.updateVideoProject
);

// Video olish
videoRoute.get(
  "/course/:refId/modules/:moduleId/get-video/:videoId",
  VideoController.getVideoCourse
);

videoRoute.get(
  "/project/:refId/get-video/:videoId",
  VideoController.getVideoProject
);

// Video o'chirish
videoRoute.delete(
  "/course/:refId/modules/:moduleId/delete-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.deleteVideoCourse
);

videoRoute.delete(
  "/project/:refId/delete-video/:videoId",
  adminAuthMiddleware,
  adminMiddleware,
  VideoController.deleteVideoProject
);

module.exports = videoRoute;
