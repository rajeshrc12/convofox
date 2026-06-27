import { socket } from "@/socket"
import { Button } from "@workspace/ui/components/button"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const MeetingId = () => {
  const { id: meetingId } = useParams()
  const [users, setUsers] = useState<string[]>([])
  const [messages, setMessages] = useState<
    { userId: string; message: string }[]
  >([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    socket.connect()

    socket.emit("join-meeting", { meetingId })

    socket.on("receive-message", (data) => {
      console.log("New message:", data)
      setMessages((prev) => [...prev, data])
    })

    socket.on("user-joined", (userId) => {
      console.log("User joined:", userId)
      setUsers((prev) => [...prev, userId])
    })

    return () => {
      socket.off("receive-message")
      socket.off("user-joined")
      socket.disconnect()
    }
  }, [meetingId])

  const sendMessage = () => {
    socket.emit("send-message", {
      meetingId,
      message,
    })
    setMessage("")
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Meeting ID: {meetingId}</h1>

      <div className="flex h-125 gap-6">
        {/* Users */}
        <div className="w-1/3 rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Users</h2>

          <div className="space-y-2">
            {users.map((user, index) => (
              <div key={index} className="rounded border bg-gray-100 p-2">
                {user}
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex w-2/3 flex-col rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Messages</h2>

          <div className="mb-4 flex-1 overflow-y-auto rounded border p-2">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>{msg?.userId}: </strong>
                {msg?.message}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 rounded border px-3 py-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingId
