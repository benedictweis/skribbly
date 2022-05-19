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

canvas.addEventListener("mousedown", (e) => {
    drawing = true
    ctx.beginPath();
    ctx.arc(e.offsetX*relativeSize,e.offsetY*relativeSize,brushSize,0,2*Math.PI);
    ctx.fill();
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
    drawing = false;
    previousPosition = -1;
});
canvas.addEventListener("mouseout", () => {
    drawing = false;
    previousPosition = -1;
});

let ctx = canvas.getContext("2d");

// size of circles drawn
let brushSize = 10;
ctx.lineWidth = 2*brushSize;

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
}

let previousPosition;

function draw(e){
    if (drawing){
        if (previousPosition){
            ctx.beginPath();
            ctx.moveTo(previousPosition.x,previousPosition.y);
            ctx.lineTo(e.offsetX*relativeSize,e.offsetY*relativeSize);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(e.offsetX*relativeSize,e.offsetY*relativeSize,brushSize,0,2*Math.PI);
        ctx.fill();
        
        previousPosition ={
            x: e.offsetX*relativeSize,
            y: e.offsetY*relativeSize
        }
    }
}