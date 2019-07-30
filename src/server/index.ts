import * as http from 'http';

import { registerSocketListeners } from './socket.io';
import { setupExpressServer } from './express';

// Register Express server
const app = setupExpressServer();

// Create HTTP server which Socket.IO can mount
const httpServer = http.createServer(app);

// Register Socket.IO websocket listeners
registerSocketListeners(httpServer);

httpServer.listen(3000, function(){
  console.log('listening on *:3000');
});