const CourseDto = require("../dtos/course.dto");
const BaseError = require("../errors/base.error");
const createSlug = require("../services/slug.generate");
const FileService = require("./file.service");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const ProjectDto = require("../dtos/project.dto");
const Video = require("../models/video.model");
class ProjectService {
  async create(data, picture) {
    const existProject = await Project.findOne({ title: data.title });
    if (existProject) {
      throw BaseError.BadRequest("Bunday nomli loyiha allaqachon yaratilgan!");
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
    const project = await Project.findOne({ slug: id })
      .populate("videos")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    if (!project) {
      throw BaseError.BadRequest("Loyiha topilmadi!");
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
    updateData.slug = data?.title && createSlug(data?.title);
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
    const existProject = await Project.findById(id).populate("videos");
    if (!existProject) {
      throw BaseError.BadRequest("Loyiha topilmadi!");
    }
    if (existProject.image && existProject.image.length > 0) {
      FileService.deleteCourseImage(existProject.image);
    }

    existProject.videos.forEach(async (video) => {
      FileService.deleteCourseVideo(video.url);
      await Video.findByIdAndDelete(video._id);
    });

    return await Project.findByIdAndDelete(id);
  }

  async enrollProject(projectId, userId) {
    const project = await Project.findById(projectId);
    const user = await User.findById(userId);

    if (!project) throw BaseError.BadRequest("Loyiha topilmadi!");
    if (!user) throw BaseError.BadRequest("User topilmadi!");

    if (user.enrolledProjects.includes(projectId)) {
      return {
        message: "Siz loyihaga kirdingiz!",
      };
    }

    user.enrolledProjects.push(projectId);
    await user.save();

    project.students.push(userId);
    await project.save();

    return { message: "Siz loyihaga muvaffaqqiyatli qo'shildingiz!" };
  }
}

module.exports = new ProjectService();
