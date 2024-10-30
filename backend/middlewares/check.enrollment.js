const User = require("../models/user.model");

module.exports = async function (req, res, next) {
  try {
    const { refModel, refId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: "Foydalanuvchi topilmadi!" });
    }

    if (refModel === "Course" && !user.enrolledCourses.includes(refId)) {
      return res
        .status(403)
        .json({ message: "Siz ushbu kursga yozilmagansiz!" });
    }

    if (refModel === "Project" && !user.enrolledProjects.includes(refId)) {
      return res
        .status(403)
        .json({ message: "Siz ushbu loyihaga yozilmagansiz!" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
