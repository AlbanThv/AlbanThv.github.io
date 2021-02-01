// Chaos Game

let vertices = [];
let chaos;
let RNG;
let spaceIO = false;
let r = 0.5;
let midpoint = ([x1, y1], [x2, y2]) => [(x1 * r + x2 * (1 - r)) , (y1 * r + y2 * (1 - r)) ];


function setup() {
    createCanvas(windowWidth - 4, windowHeight - 4);
    background(0);
    noStroke();

    document.oncontextmenu = function (e) {
        fill('red');
        vertices.push(new Particle(mouseX, mouseY));
        fill('white');
    };

    document.onkeypress = function (e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            if (vertices[0]) {
                spaceIO = !spaceIO;
                if (spaceIO) {
                    once();
                    console.log("play");
                } else {
                    console.log("pause");
                }
            }
        }
    };
}

function draw() {
    if (spaceIO) {
        RNG = Math.floor(Math.random()*vertices.length);
        chaos.new(midpoint([chaos.pos.x, chaos.pos.y], [vertices[RNG].pos.x, vertices[RNG].pos.y]));
        ellipse(chaos.pos.x, chaos.pos.y, 3);
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.show();
    }

    show() {
        ellipse(this.pos.x, this.pos.y, 4);
    }

    new([x, y]) {
        this.pos = createVector(x, y);
    }
}

let once = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            if (vertices[0]) {
                fill('red');
                chaos = new Particle(vertices[0].pos.x, vertices[0].pos.y);
                fill('white');
                r = document.getElementById("r").value;
            }
        }
    };
})();