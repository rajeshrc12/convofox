class PeerService {
  private peer: RTCPeerConnection | null = null

  private readonly config: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  }

  initialize(
    stream: MediaStream,
    handlers: {
      onTrack: (event: RTCTrackEvent) => void
      onIceCandidate: (candidate: RTCIceCandidate) => void
    }
  ) {
    if (this.peer) return

    this.peer = new RTCPeerConnection(this.config)

    stream.getTracks().forEach((track) => {
      this.peer!.addTrack(track, stream)
    })

    this.peer.ontrack = handlers.onTrack

    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        handlers.onIceCandidate(event.candidate)
      }
    }
  }

  async createOffer() {
    if (!this.peer) throw new Error("Peer not initialized")

    const offer = await this.peer.createOffer()

    await this.peer.setLocalDescription(offer)

    return offer
  }

  async createAnswer() {
    if (!this.peer) throw new Error("Peer not initialized")

    const answer = await this.peer.createAnswer()

    await this.peer.setLocalDescription(answer)

    return answer
  }

  async setRemoteDescription(description: RTCSessionDescriptionInit) {
    if (!this.peer) throw new Error("Peer not initialized")

    await this.peer.setRemoteDescription(description)
  }

  async addIceCandidate(candidate: RTCIceCandidateInit) {
    if (!this.peer) return

    await this.peer.addIceCandidate(candidate)
  }

  close() {
    this.peer?.close()
    this.peer = null
  }
}

export const peerService = new PeerService()
