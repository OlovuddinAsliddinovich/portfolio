const BaseError = require("../errors/base.error");
const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(BaseError.UnauthorizedError());
    }
    const accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      return next(BaseError.UnauthorizedError());
    }
    const userPayload = tokenService.validateAccessToken(accessToken);
    if (!userPayload) {
      return next(BaseError.UnauthorizedError());
    }

    req.user = userPayload;
    next();
  } catch (error) {
    next(BaseError.UnauthorizedError());
  }
};
