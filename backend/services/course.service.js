const CourseDto = require("../dtos/course.dto");
const BaseError = require("../errors/base.error");
const Course = require("../models/course.model");
const createSlug = require("../services/slug.generate");
const FileService = require("./file.service");
const User = require("../models/user.model");
class CourseService {
  async create(data, picture) {
    const existCourse = await Course.findOne({ title: data.title });
    if (existCourse) {
      throw BaseError.BadRequest("Kurs allaqachon mavjud!");
    }
    const image = FileService.saveCourseImage(picture);
    data.slug = createSlug(data.title);
    data.image = image ? image : null;

    const course = await Course.create(data);
    const courseDto = new CourseDto(course);
    return courseDto;
  }

  async getAllCourses() {
    return await Course.find().populate("modules");
  }

  async getOneCourse(slug) {
    const course = await Course.findOne({ slug }).populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

    if (!course) {
      throw BaseError.BadRequest("Kurs topilmadi!");
    }
    const courseDto = new CourseDto(course);
    return courseDto;
  }

  async updateCourse(data, picture, id) {
    const existCourse = await Course.findById(id);
    if (!existCourse) {
      throw BaseError.BadRequest("Kurs topilmadi!");
    }

    if (picture && existCourse.image && existCourse.image.length > 0) {
      FileService.deleteCourseImage(existCourse.image);
    }

    const img = picture ? FileService.saveCourseImage(picture) : null;

    const updateData = { ...data };
    updateData.slug = data?.title && createSlug(data?.title);
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
      throw BaseError.BadRequest("Kurs topilmadi!");
    }
    if (existCourse.image && existCourse.image.length > 0) {
      FileService.deleteCourseImage(existCourse.image);
    }
    return await Course.findByIdAndDelete(id);
  }

  async enrollCourse(courseId, userId) {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) throw BaseError.BadRequest("Kurs topilmadi!");
    if (!user) throw BaseError.BadRequest("User topilmadi!");

    if (user.enrolledCourses.includes(courseId)) {
      return { message: "Kursga kirdingiz!" };
    }
    user.enrolledCourses.push(courseId);
    await user.save();

    course.students.push(userId);
    await course.save();

    return { message: "Siz kursga muvaffaqqiyatli qo'shildingiz!" };
  }
}

module.exports = new CourseService();
