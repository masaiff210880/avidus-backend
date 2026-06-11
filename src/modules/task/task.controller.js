import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
} from "./task.service.js";

export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.body, req.user.id);

    res.status(201).json({
      status: true,
      message: "Task created statusfully.",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksService(req.user.id);

    res.status(200).json({
      status: true,
      data: tasks,
      totalTasks: tasks.length,
      message: "Tasks fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTaskByIdService(id, req.user.id);

    res.status(200).json({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await updateTaskService(req.params.id, req.user.id, req.body);

    res.status(200).json({
      status: true,
      message: "Task updated statusfully.",
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

// export const deleteTask = async (req, res) => {
//   try {
//     await deleteTaskService(req.params.id, req.user.id);

//     res.status(200).json({
//       status: true,
//       message: "Task deleted statusfully.",
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTaskService(id, req.user);

    res.status(200).json({
      status: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    res.status(403).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksService();

    res.status(200).json({
      status: true,
      data: tasks,
      totalTasks: tasks.length,
      message: "Tasks fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
