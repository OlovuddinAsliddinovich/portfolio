class CourseDto {
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
  createdAt;
  updatedAt;
  constructor(course) {
    this.id = course._id;
    this.title = course.title;
    this.description = course.description;
    this.duration = course.duration;
    this.lesson_count = course.lesson_count;
    this.image = course.image;
    this.technologies = course.technologies;
    this.rating = course.rating;
    this.price = course.price;
    this.comment_count = course.comment_count;
    this.slug = course.slug;
    this.directionCategory = course.directionCategory;
    this.ratingCategory = course.ratingCategory;
    this.priceCategory = course.priceCategory;
    this.students = course.students;
    this.comments = course.comments;
    this.modules = course.modules;
    this.createdAt = course.createdAt;
    this.updatedAt = course.updatedAt;
  }
}

module.exports = CourseDto;
