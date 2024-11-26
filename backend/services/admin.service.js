const BaseError = require("../errors/base.error");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const AdminDto = require("../dtos/admin.dto");
class AdminService {
  async create({ username, password }) {
    const existAdmin = await Admin.findOne({ username });
    if (existAdmin) {
      throw BaseError.BadRequest("Admin already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashPassword });
    return admin;
  }

  async loginAdmin({ username, password }) {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw BaseError.BadRequest("Admin not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      throw BaseError.BadRequest("Wrong password!");
    }

    const adminDto = new AdminDto(admin);

    const token = await tokenService.adminTokenGenerate({ ...adminDto });

    return { admin: adminDto, token };
  }

  async getAdmin(admin) {
    const adminData = await Admin.findOne({ username: admin.username });
    if (!adminData) {
      throw BaseError.BadRequest("Admin not found");
    }

    return adminData;
  }
}

module.exports = new AdminService();
