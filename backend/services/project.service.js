const CourseDto = require("../dtos/course.dto");
const BaseError = require("../errors/base.error");
const createSlug = require("../services/slug.generate");
const FileService = require("./file.service");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const ProjectDto = require("../dtos/project.dto");
class ProjectService {
  async create(data, picture) {
    const existProject = await Project.findOne({ title: data.title });
    if (existProject) {
      throw BaseError.BadRequest("Project already exist!");
    }
    const image = FileService.saveCourseImage(picture);
    data.slug = createSlug(data.title);
    data.image = image ? image : null;

    const project = await Project.create(data);
    const projectDto = new ProjectDto(project);
    return projectDto;
  }

  async getAllProjects() {
    return await Project.find();
  }

  async getOneProject(id) {
    const project = await Project.findById(id);

    if (!project) {
      throw BaseError.BadRequest("Project not found!");
    }
    const projectDto = new ProjectDto(project);
    return projectDto;
  }

  async updateProject(data, picture, id) {
    const existProject = await Project.findById(id);
    if (!existProject) {
      throw BaseError.BadRequest("Project not found!");
    }

    if (picture && existProject.image && existProject.image.length > 0) {
      FileService.deleteCourseImage(existProject.image);
    }

    const img = picture ? FileService.saveCourseImage(picture) : null;

    const updateData = { ...data };
    updateData.slug = createSlug(data?.title);
    if (img) {
      updateData.image = img;
    }

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    const projectDto = new ProjectDto(project);

    return projectDto;
  }

  async deleteProject(id) {
    const existProject = await Project.findById(id);
    if (!existProject) {
      throw BaseError.BadRequest("Project not found!");
    }
    if (existProject.image && existProject.image.length > 0) {
      FileService.deleteCourseImage(existProject.image);
    }
    return await Project.findByIdAndDelete(id);
  }

  async enrollProject(projectId, userId) {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);

    if (!project) throw BaseError.BadRequest("Project not found!");
    if (!user) throw BaseError.BadRequest("User not found!");

    if (user.enrolledProjects.includes(projectId)) {
      throw BaseError.BadRequest("You are already enrolled in this course!");
    }

    user.enrolledProjects.push(projectId);
    await user.save();

    project.students.push(userId);
    await project.save();

    return { message: "Siz loyihaga muvaffaqqiyatli qo'shildingiz!" };
  }
}

module.exports = new ProjectService();
