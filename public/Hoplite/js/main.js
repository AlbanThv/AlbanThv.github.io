import Map from "./Map.js";

let map;
console.log("coucou55");
const s = (sketch) =>
{
    sketch.setup = () =>
    {
        console.log("coucou3");
        let cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cnv.style('display', 'block');
        // noStroke();
        sketch.strokeWeight(1);
        sketch.stroke(0);

        map = new Map();

        newP5.fill(255);
        map.set(0, 0, 0).show();
        map.set(1, 0, -1).show();
        map.set(2, 0, -2).show();
        map.set(2, -1, -1).show();
        map.set(0, -1, 1).show();
        map.set(1, -1, 0).show();
        map.set(0, 1, -1).show();
        map.set(-1, 1, 0).show();
        map.set(-1, 0, 1).show();

        sketch.fill(255);
    }
};

export let newP5 = new p5(s);

// newP5.text("bonjour", newP5.width / 2, newP5.height / 2);

function draw() {
  // background(ccc)
}

function keyPressed() {
}

function mousePressed() {
}

function mouseDragged() {
}

function mouse() {
}