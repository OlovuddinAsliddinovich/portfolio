const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const existToken = await Token.findOne({ user: userId });
    if (existToken) {
      existToken.refreshToken = refreshToken;
      existToken.save();
      return existToken;
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await Token.findOneAndDelete({ refreshToken });
    return token;
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ refreshToken });
    return token;
  }

  validateAccessToken(accessTokeen) {
    try {
      const userData = jwt.verify(accessTokeen, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async adminTokenGenerate(admin) {
    const token = await jwt.sign(admin, process.env.JWT_ADMIN_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }

  adminTokenValidate(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
