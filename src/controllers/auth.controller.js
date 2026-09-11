import { validateRegisterData } from "../utils/validations.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SessionModel } from "../models/session.model.js";
import crypto from "crypto";


export const handleUserRegister = async (req, res) => {
  try {
    validateRegisterData(req);

    const { username, email, password } = req.body;

    //? What if the user is already registered onto our platform.

    const isAlreadyRegistered = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: "Username or email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    //?Next Step is to create the JWT Token.

    //?Access Token And Refresh Token.

    //?Refresh Token ==> Stored inside cookie
    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await SessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        _id: user._id,
        sessionId: session._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleGetUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { _id: userId } = decoded;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token Not Found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await SessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const accessToken = jwt.sign(
      {
        _id: decoded._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const newRefreshToken = jwt.sign(
      {
        _id: decoded._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;

    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access Token refreshed Successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Refresh Token",
      error: error.message,
    });
  }
};

//?Building the Feature Of Logging Out Of All The Devices..
export const handleUserLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh Token Not Found",
      });
    }

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await SessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(400).json({
        message: "Invalid refresh token",
      });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logged out Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
