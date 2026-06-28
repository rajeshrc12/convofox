import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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

app.use("/signal", authenticateToken, userRoutes)

export default app
