import express from "express";

import {
  getActivities,
  getMyActivities,
  deleteActivity,
} from "./activity.controller.js";

import { protect } from "../auth/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const activityRouter = express.Router();

activityRouter.get(
  "/all",
  protect,
  // authorize("admin"),
  getActivities,
);

activityRouter.get("/my-activities", protect, getMyActivities);

activityRouter.delete(
  "/delete/:id",
  protect,
  authorize("admin"),
  deleteActivity,
);

export default activityRouter;
