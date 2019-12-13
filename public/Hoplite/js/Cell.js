export default class Cell {
    constructor(options) {
        // main parameters
        this.id = Cell.Count === undefined ? Cell.Count = 0 : ++Cell.Count;
        this.ctx = options.ctx;
        this.x = options.x;
        this.y = options.y;
        this.z = options.z;
        this.size = options.size;

        // drawing parameters
        this.w = 2 * this.size * 3 / 4;
        this.h = Math.sqrt(3) * this.size * 0.5;
        this.gridX = this.ctx.width / 2 + this.w * this.x;
        this.gridY = this.ctx.height / 2 + this.h * (this.z - this.y);

        // misc parameters
        this.color = "rgb(100, 100, 100)";
        this.void = false;
        this.wall = false;

        // A* parameters
        this.AStar_f = 0;
        this.AStar_g = 0;
        this.AStar_h = 0;
        this.AStar_visited = false;
        this.AStar_closed = false;
        this.AStar_debug = "";
        this.AStar_parent = null;
    }

    show() {
        if (this.wall) {
            this.color = `rgb(170, 50, 50)`;
        }
        this.hexagon();
    }

    hexagon(color = this.color, x = this.gridX, y = this.gridY, size = this.size, npoints = 6, rotate = 0) {
        let angle = this.ctx.TWO_PI / npoints;
        this.ctx.fill(this.ctx.color(color));
        this.ctx.beginShape();
        for (let a = rotate; a < this.ctx.TWO_PI; a += angle) {
            let sx = x + Math.cos(a) * size;
            let sy = y + Math.sin(a) * size;
            this.ctx.vertex(sx, sy);
        }
        this.ctx.endShape(this.ctx.CLOSE);

        // number
        this.ctx.fill(0);
        this.ctx.text(this.id > 9 ? "" + this.id : "0" + this.id, x - 6, y + 5);
        this.ctx.fill(this.ctx.color(100, 255, 100));
        this.ctx.text(`${this.x}.${this.y}.${this.z}`, x - 14, y + 20);
    }

    colour(r = 255, g = r, b = r, a = 1) {
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}
