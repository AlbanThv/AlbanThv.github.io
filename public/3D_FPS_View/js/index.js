// Tutorial by ヘロンの数学 https://youtu.be/Mtf4rz9UEQo

class Vec2 {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
    /**
     * @param {Vec2} b 
     */
    add(b) {
        let a = this;
        return new Vec2(a.x+b.x, a.y+b.y);
    }
    /**
     * @param {Vec2} b 
     */
    sub(b) {
        let a = this;
        return new Vec2(a.x-b.x, a.y-b.y);
    }
    /**
     * @param {number} s 
     */
    mult(s) {
        return new Vec2(s*this.x, s*this.y);
    }
    mag() {
        return sqrt(this.x ** 2 + this.y ** 2);
    }
}

class Ray2 {
    /**
     * @param {Vec2} pos 
     * @param {Vec2} way 
     */
    constructor(pos, way) {
        this.pos = pos;
        this.way = way;
    }
    /**
     * @param {Vec2} begin 
     * @param {Vec2} end 
     */
    static with2p(begin, end) {
        return new Ray2(begin, end.sub(begin));
    }
    get begin() {
        return this.pos;
    }
    get end() {
        return this.pos.add(this.way);
    }
    /**
     * @param {Ray2} r2 
     */
    intersection(r2) {
        let r1 = this;
        if (abs(r1.way.x) < 0.01) r1.way.x = 0.01;
        if (abs(r2.way.x) < 0.01) r2.way.x = 0.01;
        let t1 = r1.way.y / r1.way.x;
        let t2 = r2.way.y / r2.way.x;
        let x1 = r1.pos.x;
        let x2 = r2.pos.x;
        let y1 = r1.pos.y;
        let y2 = r2.pos.y;
        let sx = (t1*x1 - t2*x2 - y1 + y2) / (t1 - t2);
        let sy = t1 * (sx - x1) + y1;
        if (
            sx > min(r1.begin.x, r1.end.x)
            && sx < max(r1.begin.x, r1.end.x)
            && sx > min(r2.begin.x, r2.end.x)
            && sx < max(r2.begin.x, r2.end.x)
        ) {
            return new Vec2(sx, sy);
        } else {
            return null;
        }
    }
}

class Player {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.angle = 0;
    }
    /**
     * @param {number} a - 1 = forward, -1 = backward
     */
    move(a) {
        let dir = new Vec2(cos(this.angle), sin(this.angle));
        if (a == 1) {
            this.pos = this.pos.add(dir);
        } else {
            this.pos = this.pos.sub(dir);
        }
    }
}

class Game {
    constructor() {
        this.player = new Player();
        this.walls = [];
    }
    reset() {
        this.player.pos = new Vec2(150, 250);
        this.player.angle = 0;
        this.walls = [
            Ray2.with2p(new Vec2(50, 50), new Vec2(100, 300)),
            Ray2.with2p(new Vec2(100, 300), new Vec2(250, 200)),
            Ray2.with2p(new Vec2(250, 200), new Vec2(50, 50)),
        ];
    }
}

// Global variables
/** @type {Game} */
let game;

function setup() {
    createCanvas(720, 480);

    game = new Game();
    game.reset();
}

function draw() {
    noSmooth();
    background(64);
    
    // draw walls
    stroke('white');
    strokeWeight(3);
    let walls = game.walls;
    for (const wall of walls) {
        line(wall.begin.x, wall.begin.y, wall.end.x, wall.end.y);
    }

    // draw player
    stroke('yellow');
    strokeWeight(20);
    let player = game.player;
    point(player.pos.x, player.pos.y);

    // key input
    if (keyIsDown(81)) player.angle -= PI / 120; // turn left
    if (keyIsDown(68)) player.angle += PI / 120; // turn right
    if (keyIsDown(90)) player.move(1); // move forward
    if (keyIsDown(83)) player.move(-1); // move backward

    {
        let viewRect = new Ray2(new Vec2(380, 40), new Vec2(320, 240));

        let fov = PI / 2;
        let centerAngle = player.angle;
        let leftAngle = player.angle - fov/2;
        let rightAngle = player.angle + fov/2;
        let beamTotal = 32;
        let beamIndex = -1;
        for(let angle=leftAngle; angle<rightAngle+0.01; angle+=fov/beamTotal) {
            beamIndex++;
            let beam = new Ray2(
                player.pos.copy(),
                new Vec2(cos(angle), sin(angle)).mult(120)
            );
            stroke('yellow');
            strokeWeight(1);
            line(beam.begin.x, beam.begin.y, beam.end.x, beam.end.y);

            let allHitBeamsWays = walls.map(wall => beam.intersection(wall))
                .filter(pos => pos !== null)
                .map(pos => pos.sub(beam.begin));
            if (allHitBeamsWays.length === 0) continue;
            let hitBeam = allHitBeamsWays.reduce((a, b) => a.mag() < b.mag() ? a : b);

            stroke('yellow');
            strokeWeight(8);
            let hitPos = hitBeam.add(beam.begin);
            point(hitPos.x, hitPos.y);

            // 3D view
            let wallDist = hitBeam.mag();
            let wallPerpDist = wallDist * cos(angle - centerAngle);
            let lineHeight = constrain(2800 / wallPerpDist, 0, viewRect.way.y);
            lineHeight -= lineHeight % 8;
            let lineBegin = viewRect.begin.add(
                new Vec2(
                    viewRect.way.x / beamTotal * beamIndex,
                    viewRect.way.y / 2 - lineHeight / 2
                )
            );
            let lightness = 224;
            strokeWeight(0);
            fill(lightness);
            rect(lineBegin.x, lineBegin.y, 7, lineHeight);
            
            // 3D view window
            noFill();
            stroke('cyan');
            strokeWeight(4);
            rect(viewRect.pos.x, viewRect.pos.y, viewRect.way.x + 8, viewRect.way.y);
        }
    }
    
}

function touchMoved(event) {
    let player = game.player;
    player.pos.x = event.clientX;
    player.pos.y = event.clientY;
}