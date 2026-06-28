import { Request, Response } from "express"
import { getGoogleAuthUrl, loginWithGoogle } from "@/services/auth"
import { env } from "@/config/env"

export const googleAuth = async (_req: Request, res: Response) => {
  const url = getGoogleAuthUrl()

  res.redirect(url)
}

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string

    const data = await loginWithGoogle(code)

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    })

    res.redirect(`${env.FRONTEND_URL}/dashboard`)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Google auth failed",
    })
  }
}

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
  })

  res.status(200).json({
    message: "Logged out successfully",
  })
}
