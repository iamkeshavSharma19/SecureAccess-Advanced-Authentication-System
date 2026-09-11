import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";


const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: [3, "Username should lie between 3 to 30 characters"],
    maxLength: [30, "Username should lie between 3 to 30 characters"],
    trim: true,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please Provide a valid EmailId");
      }
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password should be atleast of 6 characters length"],
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Please Provide a Strong Password");
      }
    },
  },
});

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return token;
};

export const UserModel = mongoose.model("User", userSchema);
