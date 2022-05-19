let canvas = document.querySelector(".canvas");
let canvas_container = document.querySelector(".canvas-container");

// size of canvas relative to actual size on screen
let relativeSize;

canvas.height = 800;
canvas.width = 1200;

resize_canvas();
window.addEventListener("resize", () => {
    resize_canvas();
})

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false);

let ctx = canvas.getContext("2d");

// size of circles drawn
let brushSize = 10;

ctx.imageSmootingEnabled = false;

draw(200,200);

function resize_canvas() {
    if (canvas_container.clientWidth / canvas_container.clientHeight < 3/2) {
        canvas.style.width = "100%";
        canvas.style.height = "";
    }
    else {
        canvas.style.height = "100%";
        canvas.style.width = "";
    }
    recalculateRelativeSize();
}

function recalculateRelativeSize(){
    relativeSize = canvas.width/canvas.clientWidth;
    console.log(relativeSize);
}

function draw(e){
    if (drawing){
        ctx.beginPath();
        ctx.arc(e.offsetX*relativeSize,e.offsetY*relativeSize,brushSize,0,2*Math.PI);
        ctx.fill();
    }
}