import express from "express";
import { register, login, logout } from "./auth.controller.js";
import { protect } from "./auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", protect, logout);

export default authRouter;
