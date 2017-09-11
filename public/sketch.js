var ship;
var asteroids = [];
var lasers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log('topkek');
    //window.alert("- Arrow keys or zqsd to move\n- x key to fire\n- c for bombe");
    ship = new Ship();
    ship.coloring();
    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
        asteroids[i].coloring();
    }
}

function windowResized() {
	resizeCanvas(windowWidth-4, windowHeight-4);
}

function draw() {
    background(0);

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            location.reload();
        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        lasers[i].offscreen()
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 20) {
                        var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    break;
                }
            }
        }
    }
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    if (asteroids.length == 0) {
        window.alert("You won !");
        window.location.reload();
    }

    if (keyIsDown(LEFT_ARROW)){
        ship.setRotation(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        ship.setRotation(0.05);
    } else if (keyIsDown(81)){
        ship.setRotation(-0.05);
    } else if (keyIsDown(68)) {
        ship.setRotation(0.05);
    } else {
        ship.setRotation(0);
    }

    if (keyIsDown(UP_ARROW)) {
        ship.boosting(true);
    } else if (keyIsDown(90)) {
        ship.boosting(true);
    } else {
        ship.boosting(false);
    }

    if (keyIsDown(DOWN_ARROW)) {
        ship.slowing(true);
    } else if (keyIsDown(83)) {
        ship.slowing(true);
    } else {
        ship.slowing(false);
    }

    if (keyIsDown(75)) {
        for (var i = 0; i <= 23; i++) {
            lasers.push(new Laser(ship.pos, ship.heading+(PI/12)*i));
        }
    }

     if (keyIsDown(74)) {
         lasers.push(new Laser(ship.pos, ship.heading));
     } else if (keyIsDown(88)) {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}

function mouseClicked() {
    ship.coloring();
}

function keyPressed() {
    if  (keyCode == 88) { //|| keyCode == ) {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
    if (keyIsDown(67)) {
        for (var i = 0; i <= 23; i++) {
            lasers.push(new Laser(ship.pos, ship.heading+(PI/12)*i));
        }
    }
    if (keyCode == CONTROL) {
        ship.coloring();
    }
}

mouseClicked = function() {
	ship.coloring();
};
