import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { useState } from "react"
import { useNavigate } from "react-router"

const Home = () => {
  const [meetingId, setMeetingId] = useState("")
  const navigate = useNavigate()
  const handleJoin = () => {
    navigate(`/meeting/${meetingId}`)
  }
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-3 rounded bg-white p-3">
        <div>Join Meeting</div>
        <Input
          onChange={(e) => setMeetingId(e.target.value)}
          placeholder="Enter meeting Id"
        />
        <Button onClick={handleJoin}>Join</Button>
      </div>
    </div>
  )
}

export default Home
