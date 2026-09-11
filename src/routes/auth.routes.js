import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", authController.handleUserRegister);
authRouter.get("/get-me", userAuth, authController.handleGetUserProfile);

export default authRouter;
