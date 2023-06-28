const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('static'))

io.on('connection', (socket) => {
  socket.on('chat message', (clickedId) => {
    io.emit('chat message', clickedId);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
