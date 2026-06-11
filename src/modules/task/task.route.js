import express from "express";
import { protect } from "../auth/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasks,
  updateTask,
} from "./task.controller.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", protect, authorize("user"), createTask);
taskRouter.get("/all-task", protect, getAllTasks);
taskRouter.delete("/delete-task/:id", protect, deleteTask);
taskRouter.put("/update-task/:id", protect, updateTask);
taskRouter.get("/task-user/:id", protect, getTaskById);
taskRouter.get("/user-tasks", protect, getTasks);

export default taskRouter;
