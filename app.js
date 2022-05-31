const { log } = require('console');
const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let sessionStore = new Map;

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
    const session = sessionStore.get(sessionID);
    if (session) {
      console.log("SESSION RESTORED");
      socket.sessionID = sessionID;
      socket.gameID = session.gameID;
      socket.playerName = session.playerName;
      return next();
    }
  }
  // create new session
  socket.sessionID = socket.handshake.auth.sessionID;
  sessionStore.set(socket.sessionID, {gameID : socket.userID, playerName: socket.playerName});
  console.log(sessionStore);
  next();
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('draw-input', (msg) => {
    console.log('recieving drawing data');
    console.log(msg);

    socket.broadcast.emit('draw', msg);
  });

  socket.on("new-player", (msg) => {
    if (msg){
      socket.gameID = msg.gameID;
      socket.playerName = msg.playerName;
      sessionStore.set(socket.sessionID, {gameID : msg.gameID, playerName: msg.playerName })
      console.log(sessionStore);
    }
  })
});

