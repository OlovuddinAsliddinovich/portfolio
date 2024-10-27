const Course = require("../models/course.model");
const Module = require("../models/course.module.model");
const Video = require("../models/video.model");
const FileService = require("./file.service");

class VideoService {
  async addVideo(data, videoFile, courseId, moduleId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const module_id = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    const module = await Module.findById(module_id);
    if (!module) throw BaseError.BadRequest("Module not found!");

    const newVideo = await FileService.saveCourseVideo(videoFile);

    const video = await Video.create({
      title: data.title,
      url: newVideo.fileName,
      duration: newVideo.duration,
      module: moduleId,
    });

    module.videos.push(video._id);
    await module.save();

    return video;
  }
  async updateVideo(data, videoFile, courseId, moduleId, videoId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const module_id = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    const module = await Module.findById(module_id);
    if (!module) throw BaseError.BadRequest("Module not found!");

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

  async getVideo(courseId, moduleId, videoId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const module_id = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    const module = await Module.findById(module_id);
    if (!module) throw BaseError.BadRequest("Module not found!");

    const video = await Video.findById(videoId);
    if (!video) throw BaseError.BadRequest("Video not found!");

    return video;
  }

  async deleteVideo(courseId, moduleId, videoId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const module_id = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    const module = await Module.findById(module_id);
    if (!module) throw BaseError.BadRequest("Module not found!");

    const video = await Video.findByIdAndDelete(videoId);
    if (!video) throw BaseError.BadRequest("Video not found!");

    FileService.deleteCourseVideo(video.url);

    module.videos = module.videos.filter((id) => id.toString() !== videoId);
    await module.save();

    return video;
  }
}

module.exports = new VideoService();
