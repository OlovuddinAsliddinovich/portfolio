const VideoService = require("../services/video.service");
class VideoController {
  async addVideo(req, res, next) {
    try {
      const { courseId, moduleId } = req.params;
      let file = "";
      if (req.files) {
        file = req.files.video;
      }
      const addedVideo = await VideoService.addVideo(
        req.body,
        file,
        courseId,
        moduleId
      );
      return res.status(201).json(addedVideo);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateVideo(req, res, next) {
    try {
      const { courseId, moduleId, videoId } = req.params;
      let file = "";
      if (req.files) {
        file = req.files.video;
      }
      const updatedVideo = await VideoService.updateVideo(
        req.body,
        file,
        courseId,
        moduleId,
        videoId
      );
      return res.status(200).json(updatedVideo);
    } catch (error) {
      next(error);
    }
  }

  async getVideo(req, res, next) {
    try {
      const { courseId, moduleId, videoId } = req.params;
      const video = await VideoService.getVideo(courseId, moduleId, videoId);
      return res.status(200).json(video);
    } catch (error) {
      next(error);
    }
  }

  async deleteVideo(req, res, next) {
    try {
      const { courseId, moduleId, videoId } = req.params;
      const deletedVideo = await VideoService.deleteVideo(
        courseId,
        moduleId,
        videoId
      );
      return res.status(200).json(deletedVideo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VideoController();
