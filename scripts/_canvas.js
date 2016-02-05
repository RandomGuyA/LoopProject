
var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");
var FRAME_INTERVAL = 10;
var game = {
	images: 0,
    imagesLoaded: 0,
}
var mouse = {
    x: 0,
    y: 0,
    down: false
}
var fps=600/FRAME_INTERVAL;

function update(mod) {
	//fps=mod;
}

function render() {
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	//context.fillStyle = "#069";
	//context.fillRect(mouse.x,mouse.y,100,100);
	context.fillText("("+mouse.x+" , "+mouse.y+")",10,20);
	context.fillText("FPS: "+fps,10,40);
}


function main() {
    update((Date.now() - then) / 1000);
    if (game.images == game.imagesLoaded) {
        render();
    }
    then = Date.now();
}

var then = Date.now();

function init(){
	setInterval(main, FRAME_INTERVAL);
}





/******************************
*		MOUSE LISTENERS
*******************************/

canvas.addEventListener('mousedown', function(e) {
    mouse.down = true;
});
canvas.addEventListener('mouseup', function(e) {
    mouse.down = false;
});
canvas.addEventListener('mousemove', function(e) {
     	var rect = canvas.getBoundingClientRect();
        mouse.y= e.clientY - rect.top;
        mouse.x= e.clientX - rect.left;
});