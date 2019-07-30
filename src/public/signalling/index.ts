declare const io;

interface GuestConnection {
  guestSocketId: string,
  peerConnection: RTCPeerConnection,
}

export class SignallingService {

  private socket: any;
  private socketId: string;
  private peerList: GuestConnection[] = [];

  constructor(
    private localMediaStream: MediaStream,
    private rtcServerConfig: RTCConfiguration,
  ) {}

  create() {
    this.socket = io();
    this.registerListeners(this.socket);
  }

  // Setup Socket.IO listeners to manage the RTC Signalling process
  private registerListeners(socket: any) {

    // Connected to Socket.IO server
    socket.on('connection_success', (socketId: string) => {
      console.log(`Socket ID: [${socketId}]`);
      // Store this sockets ID
      this.socketId = socketId;
      // Request to join the room based on url path
      this.socket.emit('join_request', location.pathname);
    });

    // Socket has joined the room
    socket.on('fresh_face', async (data: {socket_id: string, room_name: string}) => {
      console.log(`A new socket has connected to '${data.room_name}': [${data.socket_id}]`);
      // Create an HTML Video container for this guests stream
      this.insertVideoElement(data.socket_id);
      // Setup a new RTC Connection with this socket
      const peerConnection = this.createRTCPeerConnection(data.socket_id);
      const offer = await this.createOffer(peerConnection);
      // Signal the offer
      this.socket.emit('signal_offer', {from: this.socketId, to: data.socket_id, offer});
    });

    // Socket being sent a RTCSessionDescriptionInit
    socket.on('offer_received', async (data: {from: string, to: string, offer: RTCSessionDescriptionInit}) => {
      console.log(`Receiving an RTC offer from ${data.from}`);
      // Create an HTML Video container for this guests stream
      this.insertVideoElement(data.from);
      // Setup a new RTC Connection with this socket
      const peerConnection = this.createRTCPeerConnection(data.from);
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await this.createAnswer(peerConnection);
      // Signal the answer
      this.socket.emit('signal_answer', {from: this.socketId, to: data.from, answer});
    });

    socket.on('answer_received', async (data: {from: string, to: string, answer: RTCSessionDescriptionInit}) => {
      console.log(`Receiving an RTC answer from ${data.from}`);
      const peerConnection = this.peerList.find(peer => peer.guestSocketId === data.from).peerConnection;
      peerConnection.setRemoteDescription(data.answer);
    });

    socket.on('ice_received', async (data: {from: string, to: string, iceCandidate: {label: number, candidate: string}}) => {
      console.log(`Receiving an Ice Candidate from ${data.from}`);
      const peerConnection = this.peerList.find(peer => peer.guestSocketId === data.from).peerConnection;
      peerConnection.addIceCandidate(new RTCIceCandidate({
        sdpMLineIndex: data.iceCandidate.label,
        candidate: data.iceCandidate.candidate
      }));
    });
  }

  private insertVideoElement(guestId: string) {
    const video = document.createElement('video');
    video.id = `guest-${guestId}`;
    video.autoplay = true;
    document.getElementById('videos').appendChild(video);
  }

  private createRTCPeerConnection(guestSocketId: string) {
    // Create the RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.rtcServerConfig);
    // Setup event listeners for this RTCPeerConnection instance
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        const candidate = {
          label: event.candidate.sdpMLineIndex,
          candidate: event.candidate.candidate,
        };
        this.socket.emit('signal_ice', {from: this.socketId, to: guestSocketId, iceCandidate: candidate});
      }
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
    peerConnection.ontrack = event => {
      console.log(`Receiving media track from ${guestSocketId}`, event);
      const guestVideoEl = document.querySelector(`#guest-${guestSocketId}`) as HTMLVideoElement;
      if (event.streams && event.streams[0]) {
        guestVideoEl.srcObject = event.streams[0];
      } else {
        let inboundStream = new MediaStream([event.track]);
        guestVideoEl.srcObject = inboundStream;
      }
    }
    // Add local stream to the connection so it can be shared
    console.log(this.localMediaStream.getTracks());
    for (const track of this.localMediaStream.getTracks()) {
      peerConnection.addTrack(track);
    }
    // Add connection to list of peers
    this.peerList.push({guestSocketId, peerConnection});

    return peerConnection;
  }

  private async createOffer(peerConnection: RTCPeerConnection) {
    const offer = await peerConnection.createOffer({offerToReceiveVideo: true, offerToReceiveAudio: true});
    peerConnection.setLocalDescription(offer);
    return offer;
  }

  private async createAnswer(peerConnection: RTCPeerConnection) {
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    return answer;
  }
}