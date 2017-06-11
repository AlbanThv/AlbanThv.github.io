var socket;

function setup() {
	socket = io.connect('https://vengeur69.github.io');
	socket.on('mouse', draw);
	createCanvas(720,480);
	background(51);
	//ship = new Ship();
}

function draw() {
	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data);
}

// function windowResized() {
	// resizeCanvas(windowWidth-4, windowHeight-4);
// }

function newDrawing(data) {

}






