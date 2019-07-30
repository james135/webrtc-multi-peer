import { getUserMedia } from './media';
import { SignallingService } from './signalling';

// Assign browsers media stream to <video></video> element
const setLocalMediaStream = (stream: MediaStream) => {
  const localVideoEl = document.getElementById('localVideo') as HTMLVideoElement;
  localVideoEl.srcObject = stream;
  return stream;
}

// Get Media and setup the signalling service if successful
getUserMedia({audio: false, video: true})
  .then(setLocalMediaStream)
  .then(stream => {
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCIceServer#Example
    const config: RTCConfiguration = {
      'iceServers': [
        {
          'urls': [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ]
        },
      ],
    };
    new SignallingService(stream, config).create();
  })
  .catch((err: any) => {
    console.log(err);
  });