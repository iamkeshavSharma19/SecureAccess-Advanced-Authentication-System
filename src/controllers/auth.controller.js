import { validateRegisterData } from "../utils/validations.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

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
    const token = user.getJWT();

    //?Embedding the token inside the cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(201).json({
      message: "User Registered Successfully",
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



export const handleGetUserProfile = async (req, res) => {
  try {
    const user = req.user;

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
