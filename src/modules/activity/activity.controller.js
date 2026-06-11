import {
    getActivitiesService,
    getUserActivitiesService,
    deleteActivityService,
  } from "./activity.service.js";
  
  export const getActivities = async (
    req,
    res
  ) => {
    try {
      const activities =
        await getActivitiesService();
  
      res.status(200).json({
        status: true,
        data: activities,
        totalActivities: activities.length,
        message:
          "Activities fetched successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  export const getMyActivities = async (
    req,
    res
  ) => {
    try {
      const activities =
        await getUserActivitiesService(
          req.user.id
        );
  
      res.status(200).json({
        status: true,
        data: activities,
        totalActivities: activities.length,
        message:
          "Activities fetched successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  export const deleteActivity = async (
    req,
    res
  ) => {
    try {
      await deleteActivityService(
        req.params.id
      );
  
      res.status(200).json({
        status: true,
        message:
          "Activity deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };