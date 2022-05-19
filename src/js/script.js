let canvas = document.querySelector(".canvas");
let canvas_container = document.querySelector(".canvas-container");

const socket = io();

// size of canvas relative to actual size on screen
let relativeSize;
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 1200;

resize_canvas_element();
window.addEventListener("resize", () => {
    resize_canvas_element();
})

function resize_canvas_element() {

    let condition = canvas_container.clientWidth / canvas_container.clientHeight < 3/2;

    canvas.style.width = condition ? "100%" : "";
    canvas.style.height = condition ? "" : "100%";

    relativeSize = canvas.width/canvas.clientWidth;
}


let drawing = false;

canvas.addEventListener("mousedown", (e) => {

    start_drawing(e.offsetX*relativeSize, e.offsetY*relativeSize);

    socket.emit('draw-input', {
        type: 'start',
        x: Math.round(e.offsetX*relativeSize),
        y: Math.round(e.offsetY*relativeSize)
    });
    drawing = true;
});
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    draw_point(e.offsetX*relativeSize, e.offsetY*relativeSize);

    socket.emit('draw-input', {
        type: 'point',
        x: Math.round(e.offsetX*relativeSize),
        y: Math.round(e.offsetY*relativeSize)
    });
});
canvas.addEventListener("mouseup", cancelDrawing);
canvas.addEventListener("mouseout", cancelDrawing);

function cancelDrawing() {
    if (!drawing) return;

    end_drawing();

    drawing = false;
    socket.emit('draw-input', {
        type: 'cancel'
    });
}

function start_drawing(x, y) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 20;
    ctx.moveTo(x, y);
}

function draw_point(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
}

function end_drawing() {
    ctx.beginPath();
}

socket.on('draw', (msg) => {

    console.log(ctx);

    if (msg.type == 'start') {
        start_drawing(msg.x, msg.y);
    }
    else if (msg.type == 'cancel') {
        end_drawing();
    }
    else if (msg.type == 'point') {
        draw_point(msg.x, msg.y);
    }
});