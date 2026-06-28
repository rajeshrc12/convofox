import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "@/routes/auth"
import userRoutes from "@/routes/user"
import { authenticateToken } from "@/utils/middleware"
import { env } from "@/config/env"

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/user", authenticateToken, userRoutes)

export default app
