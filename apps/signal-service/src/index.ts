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
  console.log(`Socket Id: ${socket.id}, User Id:${socket.data?.user?.id}`)

  socket.on("meeting", ({ id }) => {
    console.log(`${socket.data?.user?.id} joined Meeting Id: ${id}`)
  })

  socket.on("disconnect", () => {
    console.log(
      `Disconnected: Socket Id: ${socket.id}, User Id:${socket.data?.user?.id}`
    )
  })
})

httpServer.listen(env.PORT, () => {
  console.log(`Server running on ${env.PORT}`)
})
