const CodeResource = require("../models/code.resource.model");
const BaseError = require("../errors/base.error");

class CodeResourceService {
  async getAllCodeResources() {
    return await CodeResource.find();
  }

  async getCodeResource(id) {
    return await CodeResource.findById(id);
  }

  async createCodeResource(data) {
    const codeResource = new CodeResource(data);
    return await codeResource.save();
  }

  async updateCodeResource(id, data) {
    const codeResource = await CodeResource.findById(id);
    if (!codeResource) {
      throw BaseError.BadRequest("CodeResource not found!");
    }
    return await CodeResource.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCodeResource(id) {
    const codeResource = await CodeResource.findById(id);
    if (!codeResource) {
      throw BaseError.BadRequest("CodeResource not found!");
    }
    return await CodeResource.findByIdAndDelete(id);
  }
}

module.exports = new CodeResourceService();
