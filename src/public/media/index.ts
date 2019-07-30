/**
 * Get Media for this browser i.e. access Webcam and Microphone
 *
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
 * @param constraints MediaStreamConstraints
 */
export const getUserMedia = (constraints: MediaStreamConstraints) => {
  if (navigator.mediaDevices === undefined) {
    return Promise.reject(new Error('navigator.mediaDevices is unavailable'));
  }
  return navigator.mediaDevices.getUserMedia(constraints);
}