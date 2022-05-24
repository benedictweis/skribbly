
const socket = io();

function submit(){
    let gameIdDoc = document.getElementById("gameid");
    let nicknameDoc = document.getElementById("nickname");
    socket.emit("new-player", {
        gameId: gameIdDoc.value,
        playerName: nicknameDoc.value
    });
}