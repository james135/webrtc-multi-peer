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