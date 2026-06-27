// socket.ts
import { env } from "@/config/env"
import { io } from "socket.io-client"

export const socket = io(env.SIGNAL_API_URL, {
  autoConnect: false,
  withCredentials: true,
})
