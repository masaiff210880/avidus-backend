import { logoutUser, registerUser, userLogin } from "./auth.service.js";

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
    res.status(409).json({ status: false, message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userLogin(req.body);

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
    res.status(401).json({ status: false, message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await logoutUser(req.user);

    res.status(200).json({
      status: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { register, login, logout };
