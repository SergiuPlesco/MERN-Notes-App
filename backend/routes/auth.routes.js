import express from "express";
const authRouter = express.Router();

import authController from "../controllers/auth.controller.js";

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgotpassword", authController.forgotpassword);
authRouter.put("/resetpassword/:resetToken", authController.resetpassword);

export default authRouter;
