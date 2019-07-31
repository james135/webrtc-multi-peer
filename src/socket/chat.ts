import { SignallingService } from './signalling';

const renderChatItem = (from: string, text: string) => {
  const container = document.getElementById('chat');
  const node = document.createElement('div');
  node.classList.add('divider');
  node.classList.add('text-center');
  node.setAttribute('data-content', from);
  container.appendChild(node);
  const textNode = document.createTextNode(text);
  container.appendChild(textNode);
}

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
const signalling = new SignallingService(config, null);
// Attach event hooks
signalling.onPeerMaybeQuit = (socketId: string) => {
  const guestVideoEl = document.querySelector(`#guest-${socketId}`) as HTMLVideoElement;
  if (guestVideoEl) {
    document.getElementById('videos').removeChild(guestVideoEl);
  }
}
signalling.onDataMessage = (socketId: string, data: string) => {
  console.log(`Message received from ${socketId}`, data);
  renderChatItem(socketId, data);
}
// Connect to the signalling server
signalling.create();

const input = document.getElementById('chat-input') as HTMLInputElement;
const submit = document.getElementById('chat-submit');

submit.onclick = () => {
  renderChatItem('you', input.value);
  signalling.sendDataMessageToAll(input.value);
  input.value = '';
}