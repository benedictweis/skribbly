const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/src/index.html")
})

app.get('/js/:script', (req, res) => {
  let script = req.params.script;
  res.sendFile(__dirname + "/src/js/" + script);
})

app.get('/style/:sheet', (req, res) => {
  let sheet = req.params.sheet;
  res.sendFile(__dirname + "/src/style/" + sheet);
})

server.listen(port, () => {
  console.log(`Skribbly listening on port ${port}`)
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('draw-input', (msg) => {
    console.log('recieving drawing data');
    console.log(msg);

    socket.broadcast.emit('draw', msg);
  });

  socket.on("new-player", (msg) => {
    console.log(msg);
  })
});