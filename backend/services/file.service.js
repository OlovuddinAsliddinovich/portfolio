const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const BaseError = require("../errors/base.error");
const ffmpeg = require("fluent-ffmpeg");

class FileService {
  save(file) {
    try {
      const fileName = `${uuidv4()}.jpg`;
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");
      const filePath = path.join(staticDir, fileName);

      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      file.mv(filePath);

      return fileName;
    } catch (error) {
      throw BaseError.BadRequest("Error saving file!");
    }
  }

  delete(fileName) {
    console.log(fileName);
    try {
      const filePath = path.join(__dirname, "..", "static", fileName);
      fs.unlinkSync(filePath);
    } catch (error) {
      throw BaseError.BadRequest("Error deleting file!");
    }
  }

  // Course image file
  saveCourseImage(file) {
    try {
      const fileName = `${uuidv4()}.jpg`;
      const currentDir = __dirname;
      const coursesDir = path.join(currentDir, "..", "courses", "course-images");

      const filePath = path.join(coursesDir, fileName);

      if (!fs.existsSync(coursesDir)) {
        fs.mkdirSync(coursesDir, { recursive: true });
      }

      file.mv(filePath);

      return fileName;
    } catch (error) {
      throw BaseError.BadRequest("Error saving file!");
    }
  }

  deleteCourseImage(fileName) {
    try {
      const filePath = path.join(__dirname, "..", "courses", "course-images", fileName);

      fs.unlinkSync(filePath);
    } catch (error) {
      console.log(error);
      throw BaseError.BadRequest("Error deleting file!");
    }
  }

  saveCourseVideo(file) {
    return new Promise((resolve, reject) => {
      const fileName = `${uuidv4()}.mp4`;
      const currentDir = __dirname;
      const coursesDir = path.join(currentDir, "..", "courses", "course-videos");
      const filePath = path.join(coursesDir, fileName);
      ffmpeg.setFfprobePath("C:/ffmpeg_file/bin/ffprobe.exe");

      if (!fs.existsSync(coursesDir)) {
        fs.mkdirSync(coursesDir, { recursive: true });
      }

      file.mv(filePath, (err) => {
        if (err) {
          return reject(new Error("Error saving file!"));
        }

        ffmpeg.ffprobe(filePath, (err, metadata) => {
          if (err) {
            console.log("Error: ", err);
            return reject(new Error("Error retrieving video metadata!"));
          }

          const duration = metadata.format.duration;

          resolve({ fileName, duration });
        });
      });
    });
  }

  deleteCourseVideo(fileName) {
    try {
      const filePath = path.join(__dirname, "..", "courses", "course-videos", fileName);
      fs.unlinkSync(filePath);
    } catch (error) {
      throw BaseError.BadRequest("Error deleting file!");
    }
  }
}

module.exports = new FileService();
