const BaseError = require("../errors/base.error");
const Course = require("../models/course.model");
const Module = require("../models/course.module.model");

class CourseModuleService {
  async create(data, courseId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const moduleExist = course.modules.some((module) => module.title === data.title);

    if (moduleExist) throw BaseError.BadRequest("Bunday nomli modul allaqachon yaratilgan!");

    const module = await Module.create({
      title: data.title,
      videos: data.videos,
    });

    course.modules.push(module._id);
    await course.save();

    return module;
  }

  async update(courseId, moduleId, data) {
    const course = await Course.findById(courseId);

    if (!course) throw BaseError.BadRequest("Course not found!");

    if (!course.modules.includes(moduleId)) throw BaseError.BadRequest("Module not found!");

    const updateModule = await Module.findByIdAndUpdate(moduleId, data, {
      new: true,
    });

    return updateModule;
  }

  async getAll(courseId) {
    const course = await Course.findById(courseId).populate({ path: "modules", populate: { path: "videos" } });
    if (!course) throw BaseError.BadRequest("Course not found!");
    return course.modules;
  }

  async getOne(courseId, moduleId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const oneModule = course.modules.find((module) => module._id.toString() === moduleId).populate("videos");

    return oneModule;
  }

  async deleteModule(courseId, moduleId) {
    const course = await Course.findById(courseId).populate("modules");
    if (!course) throw BaseError.BadRequest("Course not found!");

    const moduleIndex = course.modules.find((mod) => mod._id.toString() === moduleId);

    if (!moduleIndex) {
      throw BaseError.BadRequest("Module not found!");
    }
    const data = course.modules.filter((mod) => mod._id.toString() !== moduleId);
    course.modules = data;
    await course.save();
    const removeModule = await Module.findByIdAndDelete(moduleIndex._id);
    return removeModule;
  }
}

module.exports = new CourseModuleService();
