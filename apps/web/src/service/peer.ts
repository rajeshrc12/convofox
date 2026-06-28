class PeerService {
  private peer: RTCPeerConnection | null = null

  private readonly config: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  }

  createPeer(stream: MediaStream): RTCPeerConnection {
    if (this.peer) {
      return this.peer
    }

    this.peer = new RTCPeerConnection(this.config)

    stream.getTracks().forEach((track) => {
      this.peer!.addTrack(track, stream)
    })

    return this.peer
  }

  get connection(): RTCPeerConnection | null {
    return this.peer
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peer) {
      throw new Error("Peer connection not created")
    }

    const offer = await this.peer.createOffer()
    await this.peer.setLocalDescription(offer)

    return offer
  }

  async createAnswer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peer) {
      throw new Error("Peer connection not created")
    }

    const answer = await this.peer.createAnswer()
    await this.peer.setLocalDescription(answer)

    return answer
  }

  async setRemoteDescription(
    description: RTCSessionDescriptionInit
  ): Promise<void> {
    if (!this.peer) {
      throw new Error("Peer connection not created")
    }

    await this.peer.setRemoteDescription(description)
  }

  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.peer) return

    await this.peer.addIceCandidate(candidate)
  }

  close(): void {
    this.peer?.close()
    this.peer = null
  }
}

export const peerService = new PeerService()
