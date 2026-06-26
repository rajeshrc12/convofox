import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/user";
import { authenticateToken } from "@/utils/middleware";

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend
    credentials: true, // allow cookies
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", authenticateToken, userRoutes);

export default app;
