let socket = io();

const sessionID = localStorage.getItem("sessionID");
console.log(sessionID);
if (sessionID){
    socket.auth = {sessionID};
    socket.connect();
}

socket.on("session", ({ sessionID, userID }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
});

function submit(){

    let gameIdDoc = document.getElementById("gameid");
    let nicknameDoc = document.getElementById("nickname");
    socket.emit("new-player", {
        gameId: gameIdDoc.value,
        playerName: nicknameDoc.value
    });
}