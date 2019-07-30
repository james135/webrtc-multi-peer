export const getUserMedia = (constraints: MediaStreamConstraints) => {
  if (navigator.mediaDevices === undefined) {
    return Promise.reject(new Error('navigator.mediaDevices is unavailable'));
  }
  return navigator.mediaDevices.getUserMedia(constraints);
}