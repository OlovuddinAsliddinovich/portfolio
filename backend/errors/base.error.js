module.exports = class BaseError extends Error {
  status;
  errors;
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new BaseError(401, "User ro'yxatdan o'tmagan!");
  }
  static AdminUnathorizedError() {
    return new BaseError(401, "Admin ro'yxatdan o'tmagan!");
  }
  static BadRequest(message, errors = []) {
    return new BaseError(400, message, errors);
  }
};
