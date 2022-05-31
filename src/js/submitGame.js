const prevSessionID = localStorage.getItem("sessionID");
let socket = io({
    auth: {
        sessionID: getSID()
}
});

function getSID(){
        if (prevSessionID){
            return prevSessionID;
        }
        localStorage.setItem("sessionID",Math.random().toString(36).slice(2))
        localStorage.getItem("sessionID");
}

function submit(){

    let gameIdDoc = document.getElementById("gameid");
    let nicknameDoc = document.getElementById("nickname");
    socket.emit("new-player", {
        gameID: gameIdDoc.value,
        playerName: nicknameDoc.value
    });
}