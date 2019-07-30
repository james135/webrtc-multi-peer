declare const io;
const socket = io();

socket.on('connection_success', (socketId: string) => {
  console.log(`Socket ID: [${socketId}]`);
  socket.emit('join_request', location.pathname);
});

socket.on('fresh_face', (data: {socket_id: string, room_name: string}) => {
  console.log(`A new socket has connected to '${data.room_name}': [${data.socket_id}]`);
});