// double pendulum formula : https://www.myphysicslab.com/pendulum/double-pendulum-en.html
// triple pendulum formula : https://www.nickeyre.com/images/triplependulum.pdf

let l1 = 200, l2 = 150, l3 = 0;
let m1 = Math.random()*10, m2 = Math.random()*10, m3 = 0;
let a1 = Math.PI/2, a2 = Math.PI/2, a3 = 0;
let a1_v = 0, a2_v = 0, a3_v = 0;
let g = 1;//9.81;

let pg;
let cx, cy;
let px1 = -1, py1 = -1;
let px2 = -1, py2 = -1;
let px3 = -1, py3 = -1;

function setup() {
    createCanvas(windowWidth - 4, windowHeight - 4);
    background(255);
    cx = width/2, cy = 100;

    pg = createGraphics(width, height);
    pg.background(255);
    pg.translate(cx, cy);
}

function draw() {
    // noSmooth();
    image(pg, 0, 0);

    let d  = 2*m1+m2-m2*cos(2*a1-2*a2);

    let n1 = -g*(2*m1+m2)*sin(a1);
    let n2 = -m2*g*sin(a1-2*a2);
    let n3 = -2*sin(a1-a2);
    let n4 = m2*(a2_v*a2_v*l2+a1_v*a1_v*l1*cos(a1-a2));
    let a1_a = (n1+n2+n3*n4)/(l1*d);

    n1 = 2*sin(a1-a2);
    n2 = a1_v*a1_v*l1*(m1+m2);
    n3 = g*(m1+m2)*cos(a1);
    n4 = a2_v*a2_v*l2*m2*cos(a1-a2);
    let a2_a = (n1*(n2+n3+n4))/(l2*d);

    let a3_a = 0;

    translate(cx, cy);

    let x1 = l1 * sin(a1);
    let y1 = l1 * cos(a1);

    let x2 = x1 + l2 * sin(a2);
    let y2 = y1 + l2 * cos(a2);

    let x3 = x2 + l3 * sin(a3);
    let y3 = y2 + l3 * cos(a3);

    stroke('black');
    strokeWeight(2);
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);
    //line(x2, y2, x3, y3);
    strokeWeight(0);
    fill(255, 100, 100);
    ellipse(x1, y1, 10, 10);
    fill(100, 255, 100);
    ellipse(x2, y2, 10, 10);
    //fill(100, 100, 255);
    //ellipse(x3, y3, 10, 10);

    a1_v += a1_a;
    a2_v += a2_a;
    a3_v += a3_a;
    
    a1 += a1_v;
    a2 += a2_v;
    a3 += a3_v;

    // dampening
    // a1_v *= 0.9999;
    // a2_v *= 0.9999;
    // a3_v *= 0.9999;

    pg.background(255, 5);
    pg.strokeWeight(4);
    if(frameCount > 1) {
        pg.stroke(255, 100, 100);
        pg.line(px1, py1, x1, y1);
        pg.stroke(100, 255, 100);
        pg.line(px2, py2, x2, y2);
        //pg.stroke(100, 100, 255);
        //pg.line(px3, py3, x3, y3);
    }
    px1 = x1, py1 = y1;
    px2 = x2, py2 = y2;
    px3 = x3, py3 = y3;
}
