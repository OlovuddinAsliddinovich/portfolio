const CourseModuleService = require("../services/course.module.service");
class CourseModuleController {
  async create(req, res, next) {
    try {
      const { courseId } = req.params;
      const courseModule = await CourseModuleService.create(req.body, courseId);
      return res.status(201).json(courseModule);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { courseId, moduleId } = req.params;
      const courseModule = await CourseModuleService.update(
        courseId,
        moduleId,
        req.body
      );
      return res.status(200).json(courseModule);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { courseId } = req.params;
      const courseModules = await CourseModuleService.getAll(courseId);
      return res.status(200).json(courseModules);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { courseId, moduleId } = req.params;
      const course = await CourseModuleService.getOne(courseId, moduleId);
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }

  async deleteModule(req, res, next) {
    try {
      const { courseId, moduleId } = req.params;
      const deleteModule = await CourseModuleService.deleteModule(
        courseId,
        moduleId
      );

      return res.status(200).json(deleteModule);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseModuleController();
