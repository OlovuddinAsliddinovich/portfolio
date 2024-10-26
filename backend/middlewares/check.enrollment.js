const User = require("../models/user.model");
module.exports = async function (req, res, next) {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.status(403).json({
        message: "Siz kursga qo'shilmagansiz!",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
