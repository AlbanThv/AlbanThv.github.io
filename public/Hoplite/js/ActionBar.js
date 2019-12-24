import Cell from "./Cell.js";

export default class ActionBar {
    constructor(ctx) {
        this.ctx = ctx;
        this.cellSize = this.ctx.canvas.height / 2.2;

        this.cell1 = new Cell({x: -1.5, y: 0, z: 0, size: this.cellSize, ctx: this.ctx});
        this.cell2 = new Cell({x:    0, y: 0, z: 0, size: this.cellSize, ctx: this.ctx});
        this.cell3 = new Cell({x:  1.5, y: 0, z: 0, size: this.cellSize, ctx: this.ctx});

        this.buttons = [];
        this.buttons.push(this.cell1)
        this.buttons.push(this.cell2)
        this.buttons.push(this.cell3)

        // drawing parameters
        this.w = 2 * this.cellSize * 3 / 4;
        this.h = Math.sqrt(3) * this.cellSize * 0.5;
    }

    show() {
        this.buttons.forEach(button => {
            let angle = (2 * Math.PI) / 6;
            let x = this.ctx.canvas.width / 2 + this.w * button.x;
            let y = this.ctx.canvas.height / 2 + this.h * (button.z - button.y);
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(100, 100, 100)";
            this.ctx.lineWidth = 3;
            for (let a = Math.PI/6 + button.rotate; a < 2 * Math.PI + button.rotate; a += angle) {
                let sx = x + Math.cos(a) * this.cellSize;
                let sy = y + Math.sin(a) * this.cellSize;
                this.ctx.lineTo(sx, sy);
            }
            let sx = x + Math.cos(Math.PI/6 + button.rotate) * this.cellSize;
            let sy = y + Math.sin(Math.PI/6 + button.rotate) * this.cellSize;
            this.ctx.lineTo(sx, sy);

            this.ctx.fill();
            this.ctx.stroke();
            if (button.rotate !== null) {
                button.rotate += Math.PI/300;
                if (button.rotate > Math.PI) {
                    button.rotate = 0;
                }
            }
        });
    }

    mouse_to_coords(e) {
        let mouseX = e.x - this.ctx.canvas.width / 2;
        let mouseY = e.y - this.ctx.canvas.height / 2;

        let q = (Math.sqrt(3)/3 * mouseX -  1/3 * mouseY) / this.cellSize;
        let r = (2/3 * mouseY) / this.cellSize;

        let x = q;
        let z = r;
        let y = -x - z;
        return this.cube_round(x, y, z);
    }

    cube_round(x, y, z) {
        let rx = Math.round(x);
        let ry = Math.round(y);
        let rz = Math.round(z);

        let x_diff = Math.abs(rx - x);
        let y_diff = Math.abs(ry - y);
        let z_diff = Math.abs(rz - z);

        if (x_diff > y_diff && x_diff > z_diff) {
            rx = -ry - rz;
        } else if (y_diff > z_diff) {
            ry = -rx - rz;
        } else {
            rz = -rx - ry;
        }

        if (rx === -5 && ry === -3 && rz === 8 ||
            rx === -6 && ry === -3 && rz === 9 ||
            rx === -6 && ry === -2 && rz === 8) {
                // Gauche
                console.log("this.cell1")
                console.log(this.cell1.rotate)
                if (this.cell1.rotate !== null) {
                    this.cell1.rotate = null;
                } else if (this.cell2.rotate === null && this.cell3.rotate === null) {
                    this.cell1.rotate = 0;
                }
        }
        if (rx === -4 && ry === -4 && rz === 8 ||
            rx === -4 && ry === -5 && rz === 9 ||
            rx === -5 && ry === -4 && rz === 9) {
                // Milieu
                console.log("this.cell2")
                console.log(this.cell2.rotate)
                if (this.cell2.rotate !== null) {
                    this.cell2.rotate = null;
                } else if (this.cell1.rotate === null && this.cell3.rotate === null) {
                    this.cell2.rotate = 0;
                }
        }
        if (rx === -3 && ry === -5 && rz === 8 ||
            rx === -2 && ry === -6 && rz === 8 ||
            rx === -3 && ry === -6 && rz === 9) {
                // Droite
                console.log("this.cell3")
                console.log(this.cell3.rotate)
                if (this.cell3.rotate !== null) {
                    this.cell3.rotate = null;
                } else if (this.cell1.rotate === null && this.cell2.rotate === null) {
                    this.cell3.rotate = 0;
                }
        }
        // return this.tiles[`${rx},${ry},${rz}`];
    }
}