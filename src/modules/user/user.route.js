import express from "express";
import { getUsers, deleteUserById, updateStatus } from "./user.controller.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { protect } from "../auth/auth.middleware.js";

const userRouter = express.Router();

userRouter.get(
  "/users",
  protect,
  // authorize("admin"),
  getUsers,
);
userRouter.delete("/delete/:id", protect, authorize("admin"), deleteUserById);
userRouter.put("/update/:id", protect, authorize("admin"), updateStatus);

export default userRouter;
