const BaseError = require("../errors/base.error");
const Course = require("../models/course.model");
const createSlug = require("../services/slug.generate");
const FileService = require("./file.service");
class CourseService {
  async create(data, picture) {
    const image = FileService.saveCourseImage(picture);
    const existCourse = await Course.findOne({ title: data.title });
    if (existCourse) {
      throw BaseError.BadRequest("Course already exist!");
    }
    data.slug = createSlug(data.title);
    data.image = image ? image : null;
    const course = await Course.create(data);
    return course;
  }

  async getAllCourses() {
    return await Course.find();
  }

  async getOneCourse(id) {
    return await Course.findById(id);
  }

  async updateCourse(data, picture, id) {
    const existCourse = await Course.findById(id);
    if (!existCourse) {
      throw BaseError.BadRequest("Course not found!");
    }

    if (picture && existCourse.image && existCourse.image.length > 0) {
      FileService.deleteCourseImage(existCourse.image);
    }

    const img = picture ? FileService.saveCourseImage(picture) : null;

    const updateData = { ...data };
    updateData.slug = createSlug(data?.title);
    if (img) {
      updateData.image = img;
    }

    const course = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return course;
  }

  async deleteCourse(id) {
    const existCourse = await Course.findById(id);
    if (!existCourse) {
      throw BaseError.BadRequest("Course not found!");
    }
    if (existCourse.image && existCourse.image.length > 0) {
      FileService.deleteCourseImage(existCourse.image);
    }
    return await Course.findByIdAndDelete(id);
  }
}

module.exports = new CourseService();
