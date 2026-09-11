import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    const { _id: userId } = decodedObj;

    const loggedInUser = await UserModel.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    req.user = loggedInUser;

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
