import express from "express";

import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/user/user.route.js";
import taskRouter from "../modules/task/task.route.js";
import activityRouter from "../modules/activity/activity.route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/task",taskRouter);
router.use("/activity",activityRouter);

export default router;
