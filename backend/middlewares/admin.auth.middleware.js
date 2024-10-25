const BaseError = require("../errors/base.error");
const tokenService = require("../services/token.service");

function adminAuthMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(BaseError.AdminUnathorizedError());
    }

    const adminToken = authorization.split(" ")[1];

    if (!adminToken) {
      return next(BaseError.AdminUnathorizedError());
    }

    const adminPayload = tokenService.adminTokenValidate(adminToken);

    if (!adminPayload) {
      return next(BaseError.AdminUnathorizedError());
    }

    req.user = adminPayload;
    next();
  } catch (error) {
    return next(BaseError.AdminUnathorizedError());
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return next(BaseError.AdminUnathorizedError());
  }
  next();
}

module.exports = { adminAuthMiddleware, adminMiddleware };
