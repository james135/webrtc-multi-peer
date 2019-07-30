import * as express from 'express';
import * as path from 'path';

/**
 * Setup Express JS server and attach request handles
 *
 * - https://expressjs.com
 */
export const setupExpressServer = () => {
  // Create an Express App ()
  const app = express();
  // Serve static files from a public directory
  app.use(express.static(path.join(__dirname, 'public')));

  /* Register request handles */

  // Serve index.html file
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Serve socket.html file
  app.get('/:room_id', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'socket.html'));
  });

  return app;
};