import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { createActivityService } from "../activity/activity.service.js";

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  return token;
};

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(newUser);
  return {
    token,
    newUser,
  };
};

const userLogin = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid Credential!");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credential!");
  }
  if (user.status === "inactive") {
    throw new Error("Account is inactive");
  }
  const token = generateToken(user);

  await createActivityService(
    user.id,
    "USER_LOGIN",
    `${user.name} logged in successfully`,
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const logoutUser = async (user) => {
  console.log("user in logout service", user);
  await createActivityService(
    user.id,
    "USER_LOGOUT",
    `${user.name} logged out successfully`,
  );

  return {
    status: true,
    message: "Logged out successfully.",
  };
};

export { registerUser, userLogin, logoutUser };
