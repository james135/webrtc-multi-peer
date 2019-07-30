declare const io; // Global Socket.IO object

interface GuestConnection {
  guestSocketId: string, // ID of peers socket connection
  peerConnection: RTCPeerConnection, // Local RTC connection for this peer
}

export class SignallingService {

  private socket: any;  // Socket.IO
  private socketId: string; // ID of this browsers socket connection
  private peerList: GuestConnection[] = []; // List of RTC connected peers
  private roomName = location.pathname;

  constructor(
    private localMediaStream: MediaStream,
    private rtcServerConfig: RTCConfiguration,
  ) {}

  create() {
    this.socket = io();
    this.registerListeners(this.socket);
    window.addEventListener('unload', () => {
      // Notify other sockets
      this.socket.emit('exit_room', this.roomName);
      // Clean up connections
      for (const peer of this.peerList) {
        peer.peerConnection.close();
      }
    });
  }

  /**
   * Setup Socket.IO listeners to manage the RTC Signalling process
   *
   * @param socket Global Socket.IO object
   */
  private registerListeners(socket: any) {

    // Connected to Socket.IO server
    socket.on('connection_success', (socketId: string) => {
      console.log(`Socket ID: [${socketId}]`);
      // Store this sockets ID
      this.socketId = socketId;
      // Request to join the room based on url path
      this.socket.emit('join_request', this.roomName);
    });

    // A guest socket has joined the room
    socket.on('fresh_face', async (data: {socket_id: string, room_name: string}) => {
      try {
        console.log(`A new socket has connected to '${data.room_name}': [${data.socket_id}]`);
        // Create an HTML Video container for this guests stream
        this.insertVideoElement(data.socket_id);
        // Setup a new RTC Connection with this socket
        const peerConnection = this.createRTCPeerConnection(data.socket_id);
        const offer = await this.createOffer(peerConnection);
        // Signal the offer
        this.socket.emit('signal_offer', {from: this.socketId, to: data.socket_id, offer});
      } catch (err) {
        console.log(err);
      }
    });

    // A guest socket has left the room
    socket.on('bye_friend', (data: {socket_id: string, room_name: string}) => {
      console.log(`A socket has left '${data.room_name}': [${data.socket_id}]`);
      // clean up resources
      // 1. Remove <video></video> element
      const guestVideoEl = document.querySelector(`#guest-${data.socket_id}`) as HTMLVideoElement;
      if (guestVideoEl) {
        document.getElementById('videos').removeChild(guestVideoEl);
      }
      // 2. Close RTC connection
      const peerIndex = this.peerList.findIndex(peer => peer.guestSocketId === data.socket_id);
      const peer = this.peerList[peerIndex];
      if (peer && peer.peerConnection) {
        peer.peerConnection.close();
      }
      // 3. Update peer list
      this.peerList.splice(peerIndex, 1);
    });

    // Socket being sent a RTCSessionDescriptionInit as an offer
    socket.on('offer_received', async (data: {from: string, to: string, offer: RTCSessionDescriptionInit}) => {
      try {
        console.log(`Receiving an RTC offer from ${data.from}`);
        // Create an HTML Video container for this guests stream
        this.insertVideoElement(data.from);
        // Setup a new RTC Connection with this socket
        const peerConnection = this.createRTCPeerConnection(data.from);
        peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await this.createAnswer(peerConnection);
        // Signal the answer
        this.socket.emit('signal_answer', {from: this.socketId, to: data.from, answer});
      } catch (err) {
        console.log(err);
      }
    });

    // Socket being sent as an answer
    socket.on('answer_received', async (data: {from: string, to: string, answer: RTCSessionDescriptionInit}) => {
      console.log(`Receiving an RTC answer from ${data.from}`);
      // Find the local RTC connection for this particular guest
      const peer = this.peerList.find(peer => peer.guestSocketId === data.from);
      if (peer) {
        // Assign the Answer
        peer.peerConnection.setRemoteDescription(data.answer);
      }
    });

    // Socket being sent an Ice Candidate
    socket.on('ice_received', async (data: {from: string, to: string, iceCandidate: {label: number, candidate: string}}) => {
      console.log(`Receiving an Ice Candidate from ${data.from}`);
      // Find the local RTC connection for this particular guest
      const peer = this.peerList.find(peer => peer.guestSocketId === data.from);
      if (peer) {
        // Add the candidate
        peer.peerConnection.addIceCandidate(new RTCIceCandidate({
          sdpMLineIndex: data.iceCandidate.label,
          candidate: data.iceCandidate.candidate
        }));
      }
    });
  }

  /**
   * Create a <video></video> element for the guest
   *
   * @param guestId Guest socket ID assigned as elements id=""
   */
  private insertVideoElement(guestId: string) {
    const video = document.createElement('video');
    video.id = `guest-${guestId}`;
    video.autoplay = true;
    document.getElementById('videos').appendChild(video);
  }

  /**
   * Create an RTCPeerConnection for a new guest
   *
   * @param guestSocketId Guest socket ID
   */
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
        // Signal the Ice Candidate
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
    console.log(this.localMediaStream.getTracks());
    // Add local stream to the connection so it can be shared
    for (const track of this.localMediaStream.getTracks()) {
      peerConnection.addTrack(track);
    }
    // Add connection to list of peers
    this.peerList.push({guestSocketId, peerConnection});

    return peerConnection;
  }

  /**
   * Create an RTCSessionDescriptionInit (offer) and assign to local RTCPeerConnection
   *
   * @param peerConnection RTC Connection
   */
  private async createOffer(peerConnection: RTCPeerConnection) {
    const offer = await peerConnection.createOffer({offerToReceiveVideo: true, offerToReceiveAudio: true});
    peerConnection.setLocalDescription(offer);
    return offer;
  }

  /**
   * Create an RTCSessionDescriptionInit (answer) and assign to local RTCPeerConnection
   *
   * @param peerConnection RTC Connection
   */
  private async createAnswer(peerConnection: RTCPeerConnection) {
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    return answer;
  }
}