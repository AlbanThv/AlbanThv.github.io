// double pendulum formula : https://www.myphysicslab.com/pendulum/double-pendulum-en.html
// triple pendulum formula : https://www.nickeyre.com/images/triplependulum.pdf

let l1 = 200, l2 = 150, l3 = 100;
let m1 = m2 = m3 = 1 + Math.random();
let a1 = a2 = a3 = Math.PI/2;
let a1_v = a2_v = a3_v = 0;
let g = -0.5;

let pg;
let cx, cy;
let px1 = -1, py1 = -1;
let px2 = -1, py2 = -1;
let px3 = -1, py3 = -1;

function setup() {
    createCanvas(windowWidth - 4, windowHeight - 4);
    cx = width/2, cy = 100;

    pg = createGraphics(width, height);
    pg.background(255);
    pg.translate(cx, cy);
}

function draw() {
    image(pg, 0, 0);

    let I1 = (2/5)*m1*l1*l1;
    let I2 = (2/5)*m2*l2*l2;
    let I3 = (2/5)*m3*l3*l3;

    let k1 = 0.005;
    let k2 = 0;
    let k3 = 0.0008;

    let a1_a = -(2*((l3*l3*m3*m3*sin(2*a1-2*a3)*(4*I2-l2*l2*m2)+l2*l2*sin(2*a1-2*a2)*(m2+2*m3)*(m2*m3*l3*l3+4*I3*(m2+2*m3)))*l1*l1*a1_v*a1_v+(l2*(sin(a1-a2)*((m2*m3*(m2+3*m3)*l3*l3+4*I3*(m2*m2+6*m2*m3+8*m3*m3))*l2*l2+4*I2*(m3*(m2+m3)*l3*l3+4*I3*(m2+2*m3)))+l3*l3*m3*m3*sin(a1+a2-2*a3)*(4*I2-l2*l2*m2))*a2_v*a2_v-4*k2*l2*(cos(a1-a2)*(m3*(m2+m3)*l3*l3+4*I3*(m2+2*m3))-l3*l3*m3*m3*cos(a1+a2-2*a3))*a2_v+l3*m3*(sin(a1-a3)*(8*I3*m3*l2*l2+4*I2*m3*l3*l3+16*I2*I3)+l2*l2*sin(a1-2*a2+a3)*(m2*m3*l3*l3+4*I3*(m2+2*m3)))*a3_v*a3_v-4*k3*l3*m3*(cos(a1-a3)*(2*m3*l2*l2+4*I2)-l2*l2*cos(a1-2*a2+a3)*(m2+2*m3))*a3_v-g*(sin(a1)*((m3*(m1*m2+2*m1*m3+3*m2*m3+m2*m2)*l3*l3+4*I3*(m2*m2+6*m2*m3+m1*m2+4*m3*m3+4*m1*m3))*l2*l2+4*I2*(m3*(m1+2*m2+m3)*l3*l3+4*I3*(m1+2*m2+2*m3)))+l3*l3*m3*m3*(sin(a1-2*a3)*(4*I2-l2*l2*m2)-2*l2*l2*cos(2*a2-2*a3)*sin(a1)*(m1+m2))+l2*l2*sin(a1-2*a2)*(m2+2*m3)*(m2*m3*l3*l3+4*I3*(m2+2*m3))))*l1+2*k1*(4*I2*(m3*l3*l3+4*I3)+l2*l2*(m3*(m2+2*m3)*l3*l3+4*I3*(m2+4*m3))-2*l2*l2*l3*l3*m3*m3*cos(2*a2-2*a3))*a1_v))/(64*I1*I2*I3+8*I3*l1*l1*l2*l2*m2*m2+8*I1*l2*l2*l3*l3*m3*m3+8*I2*l1*l1*l3*l3*m3*m3+32*I3*l1*l1*l2*l2*m3*m3+16*I2*I3*l1*l1*m1+16*I1*I3*l2*l2*m2+64*I2*I3*l1*l1*m2+16*I1*I2*l3*l3*m3+64*I1*I3*l2*l2*m3+64*I2*I3*l1*l1*m3+4*I3*l1*l1*l2*l2*m1*m2+4*I2*l1*l1*l3*l3*m1*m3+16*I3*l1*l1*l2*l2*m1*m3+4*I1*l2*l2*l3*l3*m2*m3+16*I2*l1*l1*l3*l3*m2*m3+48*I3*l1*l1*l2*l2*m2*m3-8*I1*l2*l2*l3*l3*m3*m3*cos(2*a2-2*a3)-2*l1*l1*l2*l2*cos(2*a1-2*a2)*(m2+2*m3)*(m2*m3*l3*l3+4*I3*(m2+2*m3))-2*l1*l1*l3*l3*m3*m3*cos(2*a1-2*a3)*(-m2*l2*l2+4*I2)+2*l1*l1*l2*l2*l3*l3*m1*m3*m3+6*l1*l1*l2*l2*l3*l3*m2*m3*m3+2*l1*l1*l2*l2*l3*l3*m2*m2*m3+l1*l1*l2*l2*l3*l3*m1*m2*m3-2*l1*l1*l2*l2*l3*l3*m1*m3*m3*cos(2*a2-2*a3)-4*l1*l1*l2*l2*l3*l3*m2*m3*m3*cos(2*a2-2*a3))
    let a2_a = (2*((l1*l1*sin(2*a1-2*a2)*(m2+2*m3)*(m2*m3*l3*l3+4*I3*(m2+2*m3))-l3*l3*m3*m3*sin(2*a2-2*a3)*((m1+2*m2)*l1*l1+4*I1))*l2*l2*a2_v*a2_v+l1*(sin(a1-a2)*((m3*(m1*(m2+m3)+2*m2*(2*m2+3*m3))*l3*l3+4*I3*(m2+2*m3)*(m1+4*m2+4*m3))*l1*l1+4*I1*(m3*(m2+m3)*l3*l3+4*I3*(m2+2*m3)))-l3*l3*m3*m3*sin(a1+a2-2*a3)*((m1+2*m2)*l1*l1+4*I1))*l2*a1_v*a1_v+4*k1*l1*(cos(a1-a2)*(m3*(m2+m3)*l3*l3+4*I3*(m2+2*m3))-l3*l3*m3*m3*cos(a1+a2-2*a3))*l2*a1_v+(-l3*m3*(sin(a2-a3)*((m3*(m1+3*m2)*l3*l3+4*I3*(m1+3*m2+2*m3))*l1*l1+4*I1*(m3*l3*l3+4*I3))-l1*l1*sin(2*a1-a2-a3)*(m2*m3*l3*l3+4*I3*(m2+2*m3)))*a3_v*a3_v+4*k3*l3*m3*(cos(a2-a3)*((m1+3*m2+2*m3)*l1*l1+4*I1)-l1*l1*cos(2*a1-a2-a3)*(m2+2*m3))*a3_v+g*(sin(a2)*((m2*m3*(2*m2+3*m3)*l3*l3+8*I3*(m2*m2+3*m2*m3+2*m3*m3))*l1*l1+4*I1*(m3*(m2+m3)*l3*l3+4*I3*(m2+2*m3)))-l1*l1*sin(2*a1-a2)*(m3*(m1*(m2+m3)+m2*(2*m2+3*m3))*l3*l3+4*I3*(m2+2*m3)*(m1+2*m2+2*m3))+l3*l3*m3*m3*(sin(a2-2*a3)*(m2*l1*l1+4*I1)+l1*l1*sin(2*a1+a2-2*a3)*(m1+m2))))*l2-2*k2*(4*I1*(m3*l3*l3+4*I3)+l1*l1*(m3*(m1+4*m2+2*m3)*l3*l3+4*I3*(m1+4*m2+4*m3))-2*l1*l1*l3*l3*m3*m3*cos(2*a1-2*a3))*a2_v))/(64*I1*I2*I3+8*I3*l1*l1*l2*l2*m2*m2+8*I1*l2*l2*l3*l3*m3*m3+8*I2*l1*l1*l3*l3*m3*m3+32*I3*l1*l1*l2*l2*m3*m3+16*I2*I3*l1*l1*m1+16*I1*I3*l2*l2*m2+64*I2*I3*l1*l1*m2+16*I1*I2*l3*l3*m3+64*I1*I3*l2*l2*m3+64*I2*I3*l1*l1*m3+4*I3*l1*l1*l2*l2*m1*m2+4*I2*l1*l1*l3*l3*m1*m3+16*I3*l1*l1*l2*l2*m1*m3+4*I1*l2*l2*l3*l3*m2*m3+16*I2*l1*l1*l3*l3*m2*m3+48*I3*l1*l1*l2*l2*m2*m3-8*I1*l2*l2*l3*l3*m3*m3*cos(2*a2-2*a3)-2*l1*l1*l2*l2*cos(2*a1-2*a2)*(m2+2*m3)*(m2*m3*l3*l3+4*I3*(m2+2*m3))-2*l1*l1*l3*l3*m3*m3*cos(2*a1-2*a3)*(-m2*l2*l2+4*I2)+2*l1*l1*l2*l2*l3*l3*m1*m3*m3+6*l1*l1*l2*l2*l3*l3*m2*m3*m3+2*l1*l1*l2*l2*l3*l3*m2*m2*m3+l1*l1*l2*l2*l3*l3*m1*m2*m3-2*l1*l1*l2*l2*l3*l3*m1*m3*m3*cos(2*a2-2*a3)-4*l1*l1*l2*l2*l3*l3*m2*m3*m3*cos(2*a2-2*a3))
    let a3_a = -(2*(32*I1*I2*k3*a3_v-l2*l3*m3*a2_v*a2_v*(sin(a2-a3)*((l2*l2*(m1*m2+4*m1*m3+6*m2*m3+m2*m2)+4*I2*(m1+3*m2+2*m3))*l1*l1+4*I1*(4*I2+l2*l2*(m2+4*m3)))+l1*l1*sin(2*a1-a2-a3)*(m2+2*m3)*(4*I2-m2*l2*l2))-l1*l3*m3*a1_v*a1_v*(sin(a1-a3)*(8*I1*(m3*l2*l2+2*I2)+2*l1*l1*((m1*m3-m2*m2)*l2*l2+2*I2*(m1+4*m2+4*m3)))-l2*l2*sin(a1-2*a2+a3)*(m2+2*m3)*((m1+2*m2)*l1*l1+4*I1))+4*k3*l1*l1*l2*l2*m2*m2*a3_v+16*k3*l1*l1*l2*l2*m3*m3*a3_v+8*I2*k3*l1*l1*m1*a3_v+8*I1*k3*l2*l2*m2*a3_v+32*I2*k3*l1*l1*m2*a3_v+32*I1*k3*l2*l2*m3*a3_v+32*I2*k3*l1*l1*m3*a3_v-4*k1*l1*l3*m3*a1_v*(cos(a1-a3)*(2*m3*l2*l2+4*I2)-l2*l2*cos(a1-2*a2+a3)*(m2+2*m3))-16*I1*I2*g*l3*m3*sin(a3)-4*I2*l1*l1*l3*l3*m3*m3*a3_v*a3_v*sin(2*a1-2*a3)-4*I1*l2*l2*l3*l3*m3*m3*a3_v*a3_v*sin(2*a2-2*a3)+8*I2*g*l1*l1*l3*m3*m3*sin(2*a1-a3)+8*I1*g*l2*l2*l3*m3*m3*sin(2*a2-a3)+2*k3*l1*l1*l2*l2*m1*m2*a3_v+8*k3*l1*l1*l2*l2*m1*m3*a3_v+24*k3*l1*l1*l2*l2*m2*m3*a3_v-4*k2*l2*l3*m3*a2_v*(cos(a2-a3)*((m1+3*m2+2*m3)*l1*l1+4*I1)-l1*l1*cos(2*a1-a2-a3)*(m2+2*m3))-8*I1*g*l2*l2*l3*m3*m3*sin(a3)-8*I2*g*l1*l1*l3*m3*m3*sin(a3)-4*k3*l1*l1*l2*l2*m2*m2*a3_v*cos(2*a1-2*a2)-16*k3*l1*l1*l2*l2*m3*m3*a3_v*cos(2*a1-2*a2)-8*I2*g*l1*l1*l3*m2*m3*sin(a3)-16*k3*l1*l1*l2*l2*m2*m3*a3_v*cos(2*a1-2*a2)-l1*l1*l2*l2*l3*l3*m1*m3*m3*a3_v*a3_v*sin(2*a2-2*a3)+l1*l1*l2*l2*l3*l3*m2*m3*m3*a3_v*a3_v*sin(2*a1-2*a3)-2*l1*l1*l2*l2*l3*l3*m2*m3*m3*a3_v*a3_v*sin(2*a2-2*a3)+2*g*l1*l1*l2*l2*l3*m1*m3*m3*sin(2*a1-a3)-g*l1*l1*l2*l2*l3*m2*m2*m3*sin(2*a1-a3)+2*g*l1*l1*l2*l2*l3*m2*m3*m3*sin(2*a2-a3)+g*l1*l1*l2*l2*l3*m2*m2*m3*sin(2*a2-a3)+4*I2*g*l1*l1*l3*m1*m3*sin(2*a1-a3)+8*I2*g*l1*l1*l3*m2*m3*sin(2*a1-a3)+4*I1*g*l2*l2*l3*m2*m3*sin(2*a2-a3)-2*g*l1*l1*l2*l2*l3*m1*m3*m3*sin(2*a1-2*a2+a3)-2*g*l1*l1*l2*l2*l3*m2*m3*m3*sin(2*a1-2*a2+a3)-g*l1*l1*l2*l2*l3*m2*m2*m3*sin(2*a1-2*a2+a3)+g*l1*l1*l2*l2*l3*m2*m2*m3*sin(a3)-g*l1*l1*l2*l2*l3*m1*m2*m3*sin(2*a1-2*a2+a3)))/(64*I1*I2*I3+8*I3*l1*l1*l2*l2*m2*m2+8*I1*l2*l2*l3*l3*m3*m3+8*I2*l1*l1*l3*l3*m3*m3+32*I3*l1*l1*l2*l2*m3*m3+16*I2*I3*l1*l1*m1+16*I1*I3*l2*l2*m2+64*I2*I3*l1*l1*m2+16*I1*I2*l3*l3*m3+64*I1*I3*l2*l2*m3+64*I2*I3*l1*l1*m3+4*I3*l1*l1*l2*l2*m1*m2+4*I2*l1*l1*l3*l3*m1*m3+16*I3*l1*l1*l2*l2*m1*m3+4*I1*l2*l2*l3*l3*m2*m3+16*I2*l1*l1*l3*l3*m2*m3+48*I3*l1*l1*l2*l2*m2*m3-8*I1*l2*l2*l3*l3*m3*m3*cos(2*a2-2*a3)-2*l1*l1*l2*l2*cos(2*a1-2*a2)*(m2+2*m3)*(m2*m3*l3*l3+4*I3*(m2+2*m3))-2*l1*l1*l3*l3*m3*m3*cos(2*a1-2*a3)*(4*I2-m2*l2*l2)+2*l1*l1*l2*l2*l3*l3*m1*m3*m3+6*l1*l1*l2*l2*l3*l3*m2*m3*m3+2*l1*l1*l2*l2*l3*l3*m2*m2*m3+l1*l1*l2*l2*l3*l3*m1*m2*m3-2*l1*l1*l2*l2*l3*l3*m1*m3*m3*cos(2*a2-2*a3)-4*l1*l1*l2*l2*l3*l3*m2*m3*m3*cos(2*a2-2*a3))

    translate(cx, cy);

    let x1 = l1 * sin(a1);
    let y1 = l1 * cos(a1);

    let x2 = x1 + l2 * sin(a2);
    let y2 = y1 + l2 * cos(a2);

    let x3 = x2 + l3 * sin(a3);
    let y3 = y2 + l3 * cos(a3);

    stroke(69);
    strokeWeight(2);
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);
    line(x2, y2, x3, y3);
    strokeWeight(0);
    fill(255, 100, 100);
    ellipse(x1, y1, 10, 10);
    fill(100, 255, 100);
    ellipse(x2, y2, 10, 10);
    fill(100, 100, 255);
    ellipse(x3, y3, 10, 10);

    a1_v += a1_a;
    a2_v += a2_a;
    a3_v += a3_a;

    a1 += a1_v;
    a2 += a2_v;
    a3 += a3_v;

    pg.background(255, 5);
    pg.strokeWeight(4);
    if(frameCount > 1) {
        pg.stroke(255, 100, 100);
        pg.line(px1, py1, x1, y1);
        pg.stroke(100, 255, 100);
        pg.line(px2, py2, x2, y2);
        pg.stroke(100, 100, 255);
        pg.line(px3, py3, x3, y3);
    }
    px1 = x1, py1 = y1;
    px2 = x2, py2 = y2;
    px3 = x3, py3 = y3;
}
