import Map from "./Map.js";

let map;
const s = (sketch) =>
{
    sketch.setup = () =>
    {
        let cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cnv.style('display', 'block');
        // noStroke();
        sketch.strokeWeight(1);
        sketch.stroke(0);

        map = new Map();

        map.set(0, 0, 0);
        map.get(0, 0, 0).show();
        map.generate(5, 5);
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