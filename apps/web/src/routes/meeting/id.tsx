import { socket } from "@/socket"
import { useEffect } from "react"
import { useParams } from "react-router"

const MeetingId = () => {
  const { id } = useParams()
  useEffect(() => {
    socket.connect()

    socket.emit("meeting", { id })

    return () => {
      socket.disconnect()
    }
  }, [id])
  return <div>Meetin ID: {id}</div>
}

export default MeetingId
