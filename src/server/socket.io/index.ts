import * as http from 'http';
import * as socket from 'socket.io';

/**
 * Register Socket.IO listeners
 *
 * @param server HTTP Server
 */
export const registerSocketListeners = (server: http.Server) => {
  // Create websocket server (https://socket.io)
  const io = socket(server);

  // Websocket Connection
  io.on('connection', function(socket){

    // New socket has connected
    console.log(`Socket [${socket.id}] connected`);
    io.to(socket.id).emit('connection_success', socket.id);

    /* Register Listeners */

    // 'signal_offer' event - A socket is requesting to send a RTCSessionDescriptionInit to another socket
    socket.on('signal_offer', (data: {from: string, to: string, offer: RTCSessionDescriptionInit}) => {
      io.to(data.to).emit('offer_received', data);
    });

    // 'signal_answer' event - A socket is requesting to send a RTCSessionDescriptionInit to another socket
    socket.on('signal_answer', (data: {from: string, to: string, answer: RTCSessionDescriptionInit}) => {
      io.to(data.to).emit('answer_received', data);
    });

    // 'signal_ice' event - A socket is requesting to send a Ice Candidate to another socket
    socket.on('signal_ice', (data: {from: string, to: string, iceCandidate: {label: number, candidate: string}}) => {
      io.to(data.to).emit('ice_received', data);
    });

    // 'join_request' event - A socket is requesting to join a room
    socket.on('join_request', (roomName: string) => {
      // https://socket.io/docs/rooms-and-namespaces/
      socket.join(roomName);
      console.log(`Socket [${socket.id}] joined room '${roomName}'`);

      // Notify other sockets in room a new socket has joined
      socket.to(roomName).emit('fresh_face', {socket_id: socket.id, room_name: roomName});
    });

    // 'disconnect' event - Fired automatically by Socket.IO when a socket loses connection
    socket.on('disconnect', () => {
      console.log(`Socket [${socket.id}] disconnected`);
    });
  });
};