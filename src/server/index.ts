import * as express from 'express';
import * as http from 'http';

const app = express();
const httpServer = http.createServer(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

httpServer.listen(3000, function(){
  console.log('listening on *:3000');
});