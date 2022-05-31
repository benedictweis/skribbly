const { log } = require('console');
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

app.get('/game', (req, res) => {

  res.sendFile(__dirname + "/src/game/index.html")
})

app.get('/js/:script', (req, res) => {
  let script = req.params.script;
  res.sendFile(__dirname + "/src/js/" + script);
})

app.get('/game/js/:script', (req, res) => {
  let script = req.params.script;
  res.sendFile(__dirname + "/src/game/js/" + script);
})

app.get('/style/:sheet', (req, res) => {
  let sheet = req.params.sheet;
  res.sendFile(__dirname + "/src/style/" + sheet);
})

app.get('/game/style/:sheet', (req, res) => {
  let sheet = req.params.sheet;
  res.sendFile(__dirname + "/src/game/style/" + sheet);
})

server.listen(port, () => {
  console.log(`Skribbly listening on port ${port}`)
})

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;

  if (sessionID) {
    // find existing session
    console.log("HI");
    const session = sessionStore.findSession(sessionID);
    if (session) {
      console.log("HELP");
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.userName = session.userName;
      console.log(socket.username);
      return next();
    }
  }
  // create new session
  socket.sessionID = Math.random().toString(36).slice(2);;
  socket.userID = Math.random().toString(36).slice(2);;
  socket.userName = "";
  next();
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on('draw-input', (msg) => {
    console.log('recieving drawing data');
    console.log(msg);

    socket.broadcast.emit('draw', msg);
  });

  socket.on("new-player", (msg) => {
    if (msg){
      socket.userName = msg.playerName;
      console.log(socket.userName);
    }
  })
});

