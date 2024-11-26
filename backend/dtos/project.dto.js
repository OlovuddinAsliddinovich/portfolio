class ProjectDto {
  id;
  title;
  description;
  duration;
  lesson_count;
  image;
  technologies;
  rating;
  price;
  comment_count;
  slug;
  directionCategory;
  ratingCategory;
  priceCategory;
  students;
  comments;
  modules;
  videos;
  createdAt;
  updatedAt;
  constructor(project) {
    this.id = project._id;
    this.title = project.title;
    this.description = project.description;
    this.duration = project.duration;
    this.lesson_count = project.lesson_count;
    this.image = project.image;
    this.technologies = project.technologies;
    this.rating = project.rating;
    this.price = project.price;
    this.comment_count = project.comment_count;
    this.slug = project.slug;
    this.directionCategory = project.directionCategory;
    this.ratingCategory = project.ratingCategory;
    this.priceCategory = project.priceCategory;
    this.students = project.students;
    this.comments = project.comments;
    this.modules = project.modules;
    this.videos = project.videos;
    this.createdAt = project.createdAt;
    this.updatedAt = project.updatedAt;
  }
}

module.exports = ProjectDto;
