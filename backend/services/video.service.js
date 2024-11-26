const BaseError = require("../errors/base.error");
const Course = require("../models/course.model");
const Project = require("../models/project.model");
const Module = require("../models/course.module.model");
const Video = require("../models/video.model");
const FileService = require("./file.service");

class VideoService {
  async addVideoCourse(data, videoFile, refId, moduleId) {
    const course = await Course.findById(refId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const modId = course.modules.find((modId) => modId._id.toString() === moduleId);
    if (!modId) throw BaseError.BadRequest("Module not found!");
    const courseModule = await Module.findById(modId._id).populate("videos");
    if (!courseModule) throw BaseError.BadRequest("Module not found!");

    const newVideo = await FileService.saveCourseVideo(videoFile);
    const video = await Video.create({
      title: data.title,
      url: newVideo.fileName,
      duration: newVideo.duration,
      refId,
    });

    courseModule.videos.push(video._id);
    await courseModule.save();

    return video;
  }

  async addVideoProject(data, videoFile, refId) {
    const project = await Project.findById(refId);
    if (!project) throw BaseError.BadRequest("Project not found!");

    const newVideo = await FileService.saveCourseVideo(videoFile);
    const video = await Video.create({
      title: data.title,
      url: newVideo.fileName,
      duration: newVideo.duration,
      refId,
    });

    project.videos.push(video._id);
    await project.save();

    return video;
  }

  async updateVideoCourse(data, videoFile, refId, moduleId, videoId) {
    const course = await Course.findById(refId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const modId = course.modules.find((modId) => modId._id.toString() === moduleId);
    if (!modId) throw BaseError.BadRequest("Module not found!");

    const courseModule = await Module.findById(modId._id);
    if (!courseModule) throw BaseError.BadRequest("Module not found!");

    if (!courseModule.videos.includes(videoId)) throw BaseError.BadRequest("Video not found!");

    const video = await Video.findById(videoId);
    if (!video) throw BaseError.BadRequest("Video not found!");

    if (videoFile) {
      FileService.deleteCourseVideo(video.url);
      const newVideo = await FileService.saveCourseVideo(videoFile);
      video.url = newVideo.fileName;
      video.duration = newVideo.duration;
    }

    video.title = data.title;
    await video.save();

    return video;
  }

  async updateVideoProject(data, videoFile, refId, videoId) {
    const project = await Project.findById(refId).populate("videos");
    if (!project) throw BaseError.BadRequest("Project not found!");

    const video = await Video.findById(videoId);
    if (!video) throw BaseError.BadRequest("Video not found!");

    if (videoFile) {
      FileService.deleteCourseVideo(video.url);
      const newVideo = await FileService.saveCourseVideo(videoFile);
      video.url = newVideo.fileName;
      video.duration = newVideo.duration;
    }

    video.title = data.title;
    await video.save();

    return video;
  }

  async getVideoCourse(refId, moduleId, videoId) {
    const course = await Course.findById(refId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const modId = course.modules.find((modId) => modId._id.toString() === moduleId);

    if (!modId) throw BaseError.BadRequest("Module not found!");

    const module = await Module.findById(modId._id).populate("videos");
    if (!module) throw BaseError.BadRequest("Module not found!");

    const idVideo = module.videos.find((vid) => vid._id.toString() === videoId);
    if (!idVideo) throw BaseError.BadRequest("Video not found!");

    const video = await Video.findOne({ _id: idVideo._id, refId });
    if (!video) throw BaseError.BadRequest("Video not found!");

    return video;
  }

  async getVideoProject(refId, videoId) {
    const project = await Project.findById(refId).populate("videos");
    if (!project) throw BaseError.BadRequest("Project not found!");

    const vidId = project.videos.find((vid) => vid._id.toString() === videoId);

    const video = await Video.findOne({ _id: vidId._id, refId });
    if (!video) throw BaseError.BadRequest("Video not found!");

    return video;
  }

  async deleteVideoCourse(refId, moduleId, videoId) {
    const course = await Course.findById(refId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const modId = course.modules.find((modId) => modId._id.toString() === moduleId);

    const module = await Module.findById(modId._id);
    if (!module) throw BaseError.BadRequest("Module not found!");

    const vidId = module.videos.find((vidId) => vidId._id.toString() === videoId);
    if (!vidId) throw BaseError.BadRequest("Video not found!");

    const video = await Video.findByIdAndDelete(vidId._id);
    if (!video) throw BaseError.BadRequest("Video not found!");

    FileService.deleteCourseVideo(video.url);

    module.videos = module.videos.filter((id) => id._id.toString() !== videoId);
    await module.save();

    return video;
  }

  async deleteVideoProject(refId, videoId) {
    const project = await Project.findById(refId).populate("videos");
    if (!project) throw BaseError.BadRequest("Project not found!");

    const vidId = project.videos.find((vidId) => vidId._id.toString() === videoId);
    const video = await Video.findByIdAndDelete(vidId._id);
    if (!video) throw BaseError.BadRequest("Video not found!");

    FileService.deleteCourseVideo(video.url);

    project.videos = project.videos.filter((id) => id._id.toString() !== videoId);
    await project.save();

    return video;
  }
}

module.exports = new VideoService();
