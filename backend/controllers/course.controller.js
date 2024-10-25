const CourseService = require("../services/course.service");

class CourseController {
  async create(req, res, next) {
    try {
      let files = "";
      if (req.files) {
        files = req.files.image;
      }
      const course = await CourseService.create(req.body, files);
      return res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  }

  async getAllCourses(req, res, next) {
    try {
      const courses = await CourseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  async getOneCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CourseService.getOneCourse(id);
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const { id } = req.params;
      let files = "";
      if (req.files) {
        files = req.files.image;
      }
      const updateCourse = await CourseService.updateCourse(
        req.body,
        files,
        id
      );
      return res.status(200).json(updateCourse);
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      const id = req.params.id;
      const deletedCourse = await CourseService.deleteCourse(id);
      return res.status(200).json(deletedCourse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CourseController();
