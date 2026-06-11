import Activity from "./activity.model.js";

export const createActivityService = async (
  userId,
  action,
  description,
  taskId = null
) => {
  return await Activity.create({
    user: userId,
    action,
    description,
    task: taskId,
  });
};

export const getActivitiesService = async () => {
  return await Activity.find()
    .populate("user", "name email")
    .populate("task", "title status")
    .sort({ createdAt: -1 });
};

export const getUserActivitiesService = async (
  userId
) => {
  return await Activity.find({
    user: userId,
  })
    .populate("task", "title status")
    .sort({ createdAt: -1 });
};

export const deleteActivityService = async (
  activityId
) => {
  return await Activity.findByIdAndDelete(activityId);
};