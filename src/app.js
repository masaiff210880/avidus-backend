import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cors from "cors";
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://avidus-admin-dashboard.vercel.app",
    ],
    credentials: true,
  }),
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
