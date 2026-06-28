import { useEffect, useRef, useState } from "react"

import { peerService } from "@/service/peer"
import { socket } from "@/socket"

const MeetingId = () => {
  const localVideo = useRef<HTMLVideoElement>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)

  const localStream = useRef<MediaStream | null>(null)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    socket.connect()

    registerSocketEvents()

    initialize()

    return cleanup
  }, [])

  async function initialize() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    localStream.current = stream

    if (localVideo.current) {
      localVideo.current.srcObject = stream
    }

    peerService.initialize(stream, {
      onTrack: handleRemoteTrack,
      onIceCandidate: (candidate) => {
        socket.emit("candidate", candidate)
      },
    })

    setReady(true)
  }

  function registerSocketEvents() {
    socket.on("offer", handleOffer)
    socket.on("answer", handleAnswer)
    socket.on("candidate", handleCandidate)
  }

  function unregisterSocketEvents() {
    socket.off("offer", handleOffer)
    socket.off("answer", handleAnswer)
    socket.off("candidate", handleCandidate)
  }

  function handleRemoteTrack(event: RTCTrackEvent) {
    if (remoteVideo.current) {
      remoteVideo.current.srcObject = event.streams[0]
    }
  }

  async function call() {
    const offer = await peerService.createOffer()

    socket.emit("offer", offer)
  }

  async function handleOffer(offer: RTCSessionDescriptionInit) {
    await peerService.setRemoteDescription(offer)

    const answer = await peerService.createAnswer()

    socket.emit("answer", answer)
  }

  async function handleAnswer(answer: RTCSessionDescriptionInit) {
    await peerService.setRemoteDescription(answer)
  }

  async function handleCandidate(candidate: RTCIceCandidateInit) {
    await peerService.addIceCandidate(candidate)
  }

  function cleanup() {
    unregisterSocketEvents()

    socket.disconnect()

    localStream.current?.getTracks().forEach((track) => track.stop())

    peerService.close()

    if (localVideo.current) {
      localVideo.current.srcObject = null
    }

    if (remoteVideo.current) {
      remoteVideo.current.srcObject = null
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            <video
              ref={localVideo}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
              You
            </span>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            <video
              ref={remoteVideo}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
              Remote
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            disabled={!ready}
            onClick={call}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Call
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetingId
