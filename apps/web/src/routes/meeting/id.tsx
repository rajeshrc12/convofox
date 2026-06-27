import VideoPlayer from "@/components/video-player"
import { socket } from "@/socket"
import { Button } from "@workspace/ui/components/button"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
const MeetingId = () => {
  const { id: meetingId } = useParams()
  const [myStream, setMyStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [remoteUser, setRemoteUser] = useState()
  const [remoteMessage, setRemoteMessage] = useState()
  const [message, setMessage] = useState("")

  useEffect(() => {
    socket.connect()

    socket.emit("join-meeting", { meetingId })

    socket.on("receive-message", (useMessage) => {
      console.log("New message:", useMessage)
      setRemoteMessage(useMessage)
    })

    socket.on("user-joined", (userId) => {
      console.log("User joined:", userId)
      setRemoteUser(userId)
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
  const handleJoinCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
    setMyStream(stream)
    setRemoteStream(stream)
  }
  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-2xl font-bold">Meeting ID: {meetingId}</h1>

      <div className="flex h-[80vh] gap-6">
        {/* Sidebar */}
        <div className="flex w-80 flex-col rounded-xl border bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Meeting</h2>

          {/* User State */}
          {!remoteUser ? (
            <div className="flex flex-1 items-center justify-center text-center text-gray-500">
              Waiting for someone to join...
            </div>
          ) : (
            <>
              <div className="mb-4 rounded-lg border p-3">
                <p className="font-medium">{remoteUser}</p>

                {!remoteStream && (
                  <Button onClick={handleJoinCall} className="mt-3 w-full">
                    Join Call
                  </Button>
                )}
              </div>

              {remoteMessage && (
                <div className="mb-4 rounded-lg bg-gray-100 p-3">
                  {remoteMessage}
                </div>
              )}
            </>
          )}

          {/* Chat */}
          <div className="mt-auto flex gap-2">
            <input
              className="flex-1 rounded-md border px-3 py-2"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex flex-1 rounded-xl border bg-white p-4 shadow">
          {!myStream && !remoteStream ? (
            <div className="flex w-full items-center justify-center text-xl text-gray-400">
              Start a call to begin
            </div>
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded-xl border bg-gray-900">
              {/* Remote Video */}
              {remoteStream ? (
                <VideoPlayer stream={remoteStream} className="h-full w-full" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">
                  Waiting for participant...
                </div>
              )}

              {/* Local Video */}
              <div className="absolute right-4 bottom-4 h-40 w-56 overflow-hidden rounded-xl border-2 border-white shadow-lg">
                <VideoPlayer
                  stream={myStream}
                  muted
                  className="h-full w-full"
                />
              </div>

              {/* Labels */}
              <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-sm text-white">
                Remote
              </span>

              <span className="absolute right-4 bottom-3 rounded bg-black/60 px-2 py-1 text-sm text-white">
                You
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MeetingId
