import { createActivityService } from "../activity/activity.service.js";
import Task from "./task.model.js";

// Get All Tasks
export const getAllTasksService = async () => {
  const tasks = await Task.find()
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  return tasks;
};

// Create Task
export const createTaskService = async (data, userId) => {
  const task = await Task.create({
    ...data,
    createdBy: userId,
  });

  await createActivityService(
    userId,
    "TASK_CREATED",
    `Created task "${task.title}"`,
    task._id,
  );

  return task;
};

// Get Tasks of User
export const getTasksService = async (userId) => {
  const tasks = await Task.find({
    createdBy: userId,
  })
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  return tasks;
};

// Get Task ById
export const getTaskByIdService = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  }).populate("createdBy", "name email role"); // adjust fields as needed

  if (!task) {
    throw new Error("Task not found or you don't have access to this task.");
  }

  return task;
};

// Update Task ById
export const updateTaskService = async (taskId, userId, data) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      createdBy: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    throw new Error(
      "Task not found or you do not have permission to update it.",
    );
  }

  await createActivityService(
    userId,
    "TASK_UPDATED",
    `Updated task "${task.title}"`,
    task._id,
  );

  return task;
};

// Delete Task ById
// export const deleteTaskService = async (taskId, userId) => {
//   const task = await Task.findOneAndDelete({
//     _id: taskId,
//     createdBy: userId,
//   });

//   if (!task) {
//     throw new Error(
//       "Task not found or you do not have permission to delete it.",
//     );
//   }

//   await createActivityService(
//     userId,
//     "TASK_DELETED",
//     `Deleted task "${task.title}"`,
//     task._id
//   );

//   return task;
// };
export const deleteTaskService = async (taskId, user) => {
  let query = { _id: taskId };

  if (user.role !== "admin") {
    query.createdBy = user.id;
  }

  const task = await Task.findOneAndDelete(query);

  if (!task) {
    throw new Error(
      "Task not found or you do not have permission to delete it.",
    );
  }

  await createActivityService(
    user.id,
    "TASK_DELETED",
    `Deleted task "${task.title}"`,
    task._id,
  );

  return task;
};
