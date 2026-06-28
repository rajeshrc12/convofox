import { createServer } from "http"
import { Server } from "socket.io"

import app from "@/app"
import { authenticateTokenSocketAuth } from "@/utils/middleware"
import { env } from "@/config/env"

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: env.FRONTEND_URL,
    credentials: true,
  },
})

io.use(authenticateTokenSocketAuth)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer)
  })

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer)
  })

  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate)
  })

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id)
  })
})

httpServer.listen(env.PORT, () => {
  console.log(`Server running on ${env.PORT}`)
})
