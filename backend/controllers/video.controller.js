const VideoService = require("../services/video.service");

class VideoController {
  async addVideoCourse(req, res, next) {
    try {
      const { refId, moduleId } = req.params;
      let file = req.files ? req.files.video : "";
      const addedVideo = await VideoService.addVideoCourse(
        req.body,
        file,
        refId,
        moduleId
      );
      return res.status(201).json(addedVideo);
    } catch (error) {
      next(error);
    }
  }
  async addVideoProject(req, res, next) {
    try {
      const { refId } = req.params;
      let file = req.files ? req.files.video : "";
      const addedVideo = await VideoService.addVideoProject(
        req.body,
        file,
        refId
      );
      return res.status(201).json(addedVideo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async updateVideoCourse(req, res, next) {
    try {
      const { refId, moduleId, videoId } = req.params;
      let file = req.files ? req.files.video : "";
      const updatedVideo = await VideoService.updateVideoCourse(
        req.body,
        file,
        refId,
        moduleId,
        videoId
      );
      return res.status(200).json(updatedVideo);
    } catch (error) {
      next(error);
    }
  }

  async updateVideoProject(req, res, next) {
    try {
      const { refId, videoId } = req.params;
      let file = req.files ? req.files.video : "";
      const updatedVideo = await VideoService.updateVideoProject(
        req.body,
        file,
        refId,
        videoId
      );
      return res.status(200).json(updatedVideo);
    } catch (error) {
      next(error);
    }
  }

  async getVideoCourse(req, res, next) {
    try {
      const { refId, moduleId, videoId } = req.params;
      const video = await VideoService.getVideoCourse(refId, moduleId, videoId);
      return res.status(200).json(video);
    } catch (error) {
      next(error);
    }
  }

  async getVideoProject(req, res, next) {
    try {
      const { refId, videoId } = req.params;
      const video = await VideoService.getVideoProject(refId, videoId);
      return res.status(200).json(video);
    } catch (error) {
      next(error);
    }
  }

  async deleteVideoCourse(req, res, next) {
    try {
      const { refId, moduleId, videoId } = req.params;
      const deletedVideo = await VideoService.deleteVideoCourse(
        refId,
        moduleId,
        videoId
      );
      return res.status(200).json(deletedVideo);
    } catch (error) {
      next(error);
    }
  }

  async deleteVideoProject(req, res, next) {
    try {
      const { refId, videoId } = req.params;
      const deletedVideo = await VideoService.deleteVideoProject(
        refId,
        videoId
      );
      return res.status(200).json(deletedVideo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VideoController();
