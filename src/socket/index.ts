import { getUserMedia } from './media';
import { SignallingService } from './signalling';

/**
 * Create a <video></video> element for the guest
 *
 * @param guestId Guest socket ID assigned as elements id=""
 */
const insertVideoElement = (guestId: string) => {
  const video = document.createElement('video');
  video.id = `guest-${guestId}`;
  video.autoplay = true;
  document.getElementById('videos').appendChild(video);
  return video;
}

// Assign browsers media stream to <video></video> element
const setLocalMediaStream = (stream: MediaStream) => {
  const localVideoEl = document.getElementById('localVideo') as HTMLVideoElement;
  localVideoEl.srcObject = stream;
  return stream;
}

// Get local media stream and setup the signalling service if successful
getUserMedia({audio: false, video: true})
  .then(setLocalMediaStream)
  .then(stream => {
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCIceServer#Example
    const config: RTCConfiguration = {
      'iceServers': [
        {
          'urls': [
            // Free public stun servers provided by Google
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
            // TODO - add turn servers
          ]
        },
      ],
    };
    // Create signalling service
    const signalling = new SignallingService(config, stream);
    // Attach event hooks
    signalling.onPeerMaybeQuit = (socketId: string) => {
      const guestVideoEl = document.querySelector(`#guest-${socketId}`) as HTMLVideoElement;
      if (guestVideoEl) {
        document.getElementById('videos').removeChild(guestVideoEl);
      }
    }
    signalling.onTrack = (socketId: string, event: RTCTrackEvent) => {
      const guestVideoEl = (document.querySelector(`#guest-${socketId}`) || insertVideoElement(socketId)) as HTMLVideoElement;
      if (event.streams && event.streams[0]) {
        guestVideoEl.srcObject = event.streams[0];
      } else {
        let inboundStream = new MediaStream([event.track]);
        guestVideoEl.srcObject = inboundStream;
      }
    }
    // Connect to the signalling server
    signalling.create();
  })
  .catch((err: any) => {
    console.log(err);
  });