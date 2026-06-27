import { env } from "@/config/env"
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { Socket } from "socket.io"

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken

  if (!token) {
    return res.status(401).json({ message: "Token missing" })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    req.user = decoded

    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export function authenticateTokenSocketAuth(
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1]

    if (!token) {
      return next(new Error("Unauthorized"))
    }

    const decoded = jwt.verify(token, env.JWT_SECRET)
    socket.data.user = decoded

    next()
  } catch {
    next(new Error("Unauthorized"))
  }
}
