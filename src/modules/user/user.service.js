import User from "./user.model.js";

// Get all users
const getAllUsers = async () => {
  return await User.find().select("-password");
};

// Delete user
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Update user
const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export { getAllUsers, deleteUser, updateUser };
