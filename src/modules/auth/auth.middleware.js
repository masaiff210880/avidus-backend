import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,    
      message: "Invalid token",
    });
  }
};
