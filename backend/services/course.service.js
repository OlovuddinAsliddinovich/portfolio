const CourseDto = require("../dtos/course.dto");
const BaseError = require("../errors/base.error");
const Course = require("../models/course.model");
const createSlug = require("../services/slug.generate");
const FileService = require("./file.service");
const User = require("../models/user.model");
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
    const courseDto = new CourseDto(course);
    return courseDto;
  }

  async getAllCourses() {
    return await Course.find();
  }

  async getOneCourse(id) {
    const course = await Course.findById(id);

    if (!course) {
      throw BaseError.BadRequest("Course not found!");
    }
    const courseDto = new CourseDto(course);
    return courseDto;
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

    const courseDto = new CourseDto(course);

    return courseDto;
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

  async enrollCourse(courseId, userId) {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) throw BaseError.BadRequest("Course not found!");
    if (!user) throw BaseError.BadRequest("User not found!");

    if (user.enrolledCourses.includes(courseId)) {
      throw BaseError.BadRequest("You are already enrolled in this course!");
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    course.students.push(userId);
    await course.save();

    return { message: "Siz kursga muvaffaqqiyatli qo'shildingiz!" };
  }
}

module.exports = new CourseService();
