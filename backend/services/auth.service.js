const UserDto = require("../dtos/user.dto");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const BaseError = require("../errors/base.error");
const FileService = require("./file.service");

class AuthService {
  async register(props) {
    const existUser = await User.findOne({ email: props.email });
    if (existUser) {
      throw BaseError.BadRequest("User already exist!");
    }
    const hashPassword = await bcrypt.hash(props.password, 10);
    const newUser = {
      ...props,
      password: hashPassword,
    };

    const user = await User.create(newUser);

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw BaseError.BadRequest("User not found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw BaseError.BadRequest("Wrong password!");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.BadRequest("Bad authorization!");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = tokenService.findToken(refreshToken);

    if (!userPayload || !tokenDb) {
      throw BaseError.UnauthorizedError();
    }

    const user = await User.findById(userPayload.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
  async getUser(token) {
    if (!token) {
      throw BaseError.BadRequest("Bad authorization!");
    }
    const accessToken = token.split(" ")[1];
    const userPayload = tokenService.validateAccessToken(accessToken);

    if (!userPayload) {
      throw BaseError.UnauthorizedError();
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      throw BaseError.BadRequest("User not found!");
    }

    const userDto = new UserDto(user);

    return { user: userDto };
  }
  async updateUser(userData, authorization, image) {
    const accessToken = authorization.split(" ")[1];

    const existUser = await User.findOne({ email: userData.email });
    if (!existUser) {
      throw BaseError.BadRequest("User not found!");
    }
    if (image && existUser.image && existUser.image.length > 0) {
      existUser.image.length > 0 && image
        ? FileService.delete(existUser.image)
        : null;
    }
    const fileName = image ? FileService.save(image) : existUser.image;
    const userPayload = tokenService.validateAccessToken(accessToken);

    if (!authorization || !accessToken || !userPayload) {
      throw BaseError.BadRequest("Bad authorization!");
    }

    let updateUserPayload = { ...userData };
    if (userData.password) {
      const hashPassword = bcrypt.hashSync(userData.password, 10);
      updateUserPayload.password = hashPassword;
    }

    const updateUser = await User.findOneAndUpdate(
      {
        email: userPayload.email,
      },
      { ...updateUserPayload, image: fileName },
      { new: true }
    );

    const userDto = new UserDto(updateUser);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
