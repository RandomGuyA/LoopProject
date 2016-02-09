var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var FPS = 60;

var canvasElement = $("<canvas id='canvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');
canvasElement = $("#canvas")[0];

var mouse = {
    x: 0,
    y: 0,
    down: false
}

function update() {
	
}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	board.draw();
	
	canvas.fillStyle = "#000";
	canvas.fillText("FPS: "+FPS,10,20);
	canvas.fillText("("+mouse.x+" , "+mouse.y+")",10,40);
}

var GameLoop = function(fn, fps){
	
	fps = fps || 60;

	var now;
	var delta;
	var interval;
	var then = new Date().getTime();
	var frames;
	var oldtime = 0;

	return (function loop(time){
		
		requestAnimationFrame(loop);

		interval = 1000/(this.fps||fps);
		now = new Date().getTime();
		delta = now - then;

		if (delta > interval) {
			// update time stuffs
			then = now - (delta % interval);

			// calculate the frames per second
			frames = 1000/(time-oldtime)
			oldtime = time;

			update();
			draw();
			// and pass current fps to it
			fn(frames);
		}
	}(0));
};

GameLoop(function(fps){
	FPS=Math.floor(fps);
}, FPS);


function Tile(x, y, width, height){
	
	this.width = width;
	this.height = height;
	this.draw = function(){
		
		canvas.rect(x,y,width,height);
		canvas.stroke();
	};
}

function Board(countX, countY, tileSize){
	
	this.countX = countX;
	this.countY = countY;
	this.tiles = function(){
		
		var tileset = [];
		
		for(var y=0; y<this.countY; y++){
			for(var x=0; x<this.countX; x++){
				
				var dx = x*tileSize;
				var dy = y*tileSize;
				
				tileset.push(new Tile(dx,dy,tileSize,tileSize));
			}
		}
		return tileset;
	};
	this.draw = function(){
		
		this.tiles().forEach(function(tile){
			tile.draw();
		});
	};
}


var board = new Board(12,6,30);

var tile = board.tiles();






/******************************
*		MOUSE LISTENERS
*******************************/

canvasElement.addEventListener('mousedown', function(e) {
    mouse.down = true;
});
canvasElement.addEventListener('mouseup', function(e) {
    mouse.down = false;
});
canvasElement.addEventListener('mousemove', function(e) {
     	var rect = canvasElement.getBoundingClientRect();
        mouse.y= e.clientY - rect.top;
        mouse.x= e.clientX - rect.left;
})

