let gameIdDoc = document.getElementById("gameid");
let nicknameDoc = document.getElementById("nickname");

const socket = io();

function submit(){
    socket.emit("new-player", {
        gameId: gameIdDoc.value,
        playerName: nicknameDoc.value
    });
}