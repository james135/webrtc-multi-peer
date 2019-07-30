import { getUserMedia } from './media';
import { SignallingService } from './signalling';

const setLocalMediaStream = (stream: MediaStream) => {
  const localVideoEl = document.getElementById('localVideo') as HTMLVideoElement;
  localVideoEl.srcObject = stream;
  return stream;
}

// Get Media
getUserMedia({audio: false, video: true})
  .then(setLocalMediaStream)
  .then(stream => {
    new SignallingService(stream, null).create();
  })
  .catch((err: any) => {
    console.log(err);
  });