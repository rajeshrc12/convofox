import { prisma, User } from "@workspace/db"
import { Request, Response } from "express"

export const getUser = async (req: Request, res: Response) => {
  try {
    const userData = req?.user as User
    const user = await prisma.user.findFirst({ where: { id: userData.id } })
    res.json(user)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "User not found",
    })
  }
}
