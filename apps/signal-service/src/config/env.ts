import dotenv from "dotenv"

dotenv.config()

export const env = {
  PORT: process.env.PORT || 3000,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GOOGLE_FALLBACK_URL: process.env.GOOGLE_FALLBACK_URL!,

  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!,

  FRONTEND_URL: process.env.FRONTEND_URL!,
}
