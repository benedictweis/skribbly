let canvas = document.querySelector(".canvas");
let canvas_container = document.querySelector(".canvas-container");

resize_canvas();
window.addEventListener("resize", () => {
    resize_canvas();
})

let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 1200;

ctx.imageSmootingEnabled = false;
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

function resize_canvas() {
    if (canvas_container.clientWidth / canvas_container.clientHeight < 3/2) {
        canvas.style.width = "100%";
        canvas.style.height = "";
    }
    else {
        canvas.style.height = "100%";
        canvas.style.width = "";
    }
}