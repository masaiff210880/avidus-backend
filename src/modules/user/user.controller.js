import { getAllUsers, deleteUser, updateUser } from "./user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch users.",
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({
      status: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete user.",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);

    res.status(200).json({
      status: true,
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user.",
    });
  }
};
