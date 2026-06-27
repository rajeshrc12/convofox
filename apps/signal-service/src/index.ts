import { createServer } from "http"
import { Server } from "socket.io"

import app from "@/app"
import { env } from "@/config/env"
import { authenticateTokenSocketAuth } from "@/utils/middleware"

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
})

io.use(authenticateTokenSocketAuth)

io.on("connection", (socket) => {
  const socketId = socket.id
  const userId = socket.data?.user?.id

  console.log(`Socket Id: ${socketId}, User Id: ${userId}`)

  socket.on("join-meeting", ({ meetingId }) => {
    socket.join(meetingId)

    socket.to(meetingId).emit("user-joined", userId)
  })

  socket.on("send-message", ({ meetingId, message }) => {
    io.to(meetingId).emit("receive-message", message)
  })

  socket.on("disconnect", () => {
    console.log(`Disconnected: Socket Id: ${socketId}, User Id: ${userId}`)
  })
})

httpServer.listen(env.PORT, () => {
  console.log(`Server running on ${env.PORT}`)
})
