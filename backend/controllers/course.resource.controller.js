const CodeResourceService = require("../services/code.resource.service");
class CourseResourceController {
  async getAllCodeResources(req, res, next) {
    try {
      const codeResources = await CodeResourceService.getAllCodeResources();
      return res.status(200).json(codeResources);
    } catch (error) {
      next(error);
    }
  }

  async getCodeResource(req, res, next) {
    try {
      const { id } = req.params;
      const codeResource = await CodeResourceService.getCodeResource(id);
      return res.status(200).json(codeResource);
    } catch (error) {
      next(error);
    }
  }

  async createCodeResource(req, res, next) {
    try {
      const codeResource = await CodeResourceService.createCodeResource(req.body);
      return res.status(201).json(codeResource);
    } catch (error) {
      next(error);
    }
  }

  async updateCodeResource(req, res, next) {
    try {
      const { id } = req.params;
      const codeResource = await CodeResourceService.updateCodeResource(id, req.body);
      return res.status(200).json(codeResource);
    } catch (error) {
      next(error);
    }
  }

  async deleteCodeResource(req, res, next) {
    try {
      const { id } = req.params;
      const codeResource = await CodeResourceService.deleteCodeResource(id);
      return res.status(200).json(codeResource);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseResourceController();
