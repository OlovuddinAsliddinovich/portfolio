const ProjectService = require("../services/project.service");

class ProjectController {
  async create(req, res, next) {
    try {
      let files = "";
      if (req.files) {
        files = req.files.image;
      }
      const project = await ProjectService.create(req.body, files);
      return res.status(201).json(project);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await ProjectService.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  async getOneProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const project = await ProjectService.getOneProject(projectId);
      return res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const { projectId } = req.params;
      let files = "";
      if (req.files) {
        files = req.files.image;
      }
      const updateProject = await ProjectService.updateProject(req.body, files, projectId);
      return res.status(200).json(updateProject);
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const deleteProject = await ProjectService.deleteProject(projectId);
      return res.status(200).json(deleteProject);
    } catch (error) {
      next(error);
    }
  }

  async enrollProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;
      const result = await ProjectService.enrollProject(projectId, userId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();
