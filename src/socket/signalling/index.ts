declare const io; // Global Socket.IO object

interface GuestConnection {
  guestSocketId: string, // ID of peers socket connection
  peerConnection: RTCPeerConnection, // Local RTC connection for this peer
  dataChannel: RTCDataChannel, // Data channel connection
}

export class SignallingService {

  private socket: any;  // Socket.IO
  private socketId: string; // ID of this browsers socket connection
  private peerList: GuestConnection[] = []; // List of RTC connected peers
  private roomName: string; // Room name identified by last part of url path

  // RTC Connection Hooks (allow the signalling service to communicate with the implementer)

  // Fired when we receive a RTCTrackEvent from a peer
  public onTrack: (peerId: string, track: RTCTrackEvent) => void = null;
  // Fired when a socket quits (note: `maybe` as RTC connection may not be established by this point)
  public onPeerMaybeQuit: (peerId: string) => void = null;
  // Fired when data message received via RTC data channel
  public onDataMessage: (peerId: string, message: string) => void = null;

  constructor(
    private rtcServerConfig: RTCConfiguration,
    private localMediaStream: MediaStream,
  ) {
    const path = location.pathname.split('/');
    this.roomName = path[path.length - 1] || 'general'; // Include default name 'general' if empty
  }

  /**
   * Establish Socket.IO connection
   *
   * - Register Socket.IO (signalling) listeners
   * - Register window.unload event to clean up connections and signal to peers
   */
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
   * Send data via RTC to all connections
   *
   * @param message Message to send
   */
  sendDataMessageToAll(message: string) {
    for (const peer of this.peerList) {
      if (peer && peer.dataChannel) {
        peer.dataChannel.send(message);
      }
    }
  }

  /**
   * Send data via RTC to specific connection
   *
   * @param socketId Socket ID of peer to send data to over RTC
   * @param message Message to send
   */
  sendDataMessageToPeer(socketId: string, message: string) {
    const peer = this.peerList.find(peer => peer.guestSocketId === socketId);
    if (peer && peer.dataChannel) {
      peer.dataChannel.send(message);
    }
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
        // Setup a new RTC Connection with this socket
        const peerConnection = this.createRTCPeerConnection(data.socket_id);
        // Setup data connection
        const dataChannel = peerConnection.createDataChannel('data_channel');
        this.setupDataChannelListeners(dataChannel, data.socket_id);
        // Create the offer
        const offer = await this.createOffer(peerConnection);
        // Signal the offer
        this.socket.emit('signal_offer', {from: this.socketId, to: data.socket_id, offer});
      } catch (err) {
        this.handleError(err);
      }
    });

    // A guest socket has left the room
    socket.on('bye_friend', (data: {socket_id: string, room_name: string}) => {
      console.log(`A socket has left '${data.room_name}': [${data.socket_id}]`);
      // Clean up resources
      // 1. Call custom onPeerMaybeQuit() handler
      if (typeof this.onPeerMaybeQuit === 'function') {
        this.onPeerMaybeQuit(data.socket_id);
      }
      // 2. Close RTC connection
      const peerIndex = this.peerList.findIndex(peer => peer.guestSocketId === data.socket_id);
      const peer = this.peerList[peerIndex];
      if (peer && peer.peerConnection) {
        peer.peerConnection.close();
        // 3. Update peer list if peer is found
        this.peerList.splice(peerIndex, 1);
      }
    });

    // Socket being sent a RTCSessionDescriptionInit as an offer
    socket.on('offer_received', async (data: {from: string, to: string, offer: RTCSessionDescriptionInit}) => {
      try {
        console.log(`Receiving an RTC offer from ${data.from}`);
        // Setup a new RTC Connection with this socket
        const peerConnection = this.createRTCPeerConnection(data.from);
        peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await this.createAnswer(peerConnection);
        // Signal the answer
        this.socket.emit('signal_answer', {from: this.socketId, to: data.from, answer});
      } catch (err) {
        this.handleError(err);
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

    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onconnectionstatechange
    peerConnection.onconnectionstatechange = event => {
      console.log(`Connection state with ${guestSocketId} has changed to ${peerConnection.connectionState}`);
    }

    // Receiving Media Track over the RTC connection
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
    peerConnection.ontrack = event => {
      console.log(`Receiving media track from ${guestSocketId}`, event);
      // Call custom onTrack() handler
      if (typeof this.onTrack === 'function') {
        this.onTrack(guestSocketId, event);
      }
    }

    // Receiving Data over the RTC data channel
    peerConnection.ondatachannel = (event) => {
      console.log(`Receiving data channel from ${guestSocketId}`, event);
      if (event.channel) {
        this.setupDataChannelListeners(event.channel, guestSocketId);
      }
    };

    // Add local stream to the connection (if available) so it can be shared
    if (this.localMediaStream) {
      for (const track of this.localMediaStream.getTracks()) {
        peerConnection.addTrack(track);
      }
    }

    // Add connection to list of peers
    this.peerList.push({guestSocketId, peerConnection, dataChannel: null});

    return peerConnection;
  }

  private setupDataChannelListeners(dataChannel: RTCDataChannel, guestSocketId: string) {
    // Setup Listeners
    dataChannel.onopen = () => {
      console.log(`Data channel open [${guestSocketId}]`);
    };
    dataChannel.onclose = () => {
      console.log(`Data channel closed [${guestSocketId}]`);
    };
    dataChannel.onmessage = (event) => {
      console.log(`Receiving data message from ${guestSocketId}`, event);
      if (typeof this.onDataMessage === 'function') {
        this.onDataMessage(guestSocketId, event.data);
      }
    };
    // Save data channel to peer
    const peer = this.peerList.find(peer => peer.guestSocketId === guestSocketId);
    if (peer) {
      // Assign the Answer
      peer.dataChannel = dataChannel;
    }
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

  /**
   * Handle errors during the signalling process
   *
   * @param err Error
   */
  private handleError(err: any) {
    // TODO - create error handling process
    console.log(err);
  }
}