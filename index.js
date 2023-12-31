const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('static'));
app.use(requestTime);

io.on('connection', (socket) => {
  socket.on('chat message', (clickedId) => {
    io.emit('chat message', clickedId);
  });

  socket.on('name', (name) => {
    io.emit('name', name);
  });
});

app.get('/download', (req, res) => {
  console.log(req.requestTime)
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});


function requestTime(req, res, next) {
  req.requestTime = Date.now();

  next();
}
