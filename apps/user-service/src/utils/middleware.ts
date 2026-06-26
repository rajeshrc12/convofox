import { env } from "@/config/env";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
