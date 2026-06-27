import { useEffect, useRef } from "react"

interface VideoPlayerProps {
  stream: MediaStream | null
  muted?: boolean
  className?: string
}

const VideoPlayer = ({
  stream,
  muted = false,
  className = "",
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
export default VideoPlayer
