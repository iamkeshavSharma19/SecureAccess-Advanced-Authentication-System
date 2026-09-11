import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", authController.handleUserRegister);
authRouter.get("/get-me", authController.handleGetUserProfile);
//?One more end point for the refresh Token
authRouter.get("/refresh-token", authController.handleRefreshToken);
authRouter.get("/logout", authController.handleUserLogout);
authRouter.get("/logout-all", authController.handleLogoutAll);
authRouter.post("/login", authController.handleLogin);
authRouter.get("/verify-email", authController.verifyEmail);

export default authRouter;
