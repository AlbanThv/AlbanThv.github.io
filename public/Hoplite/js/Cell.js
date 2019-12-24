export default class Cell {
    constructor(args) {
        // main parameters
        this.id = Cell.Count === undefined ? Cell.Count = 0 : ++Cell.Count;
        this.ctx = args.ctx;
        this.x = args.x;
        this.y = args.y;
        this.z = args.z;
        this.size = args.size;

        // drawing parameters
        this.h = 2 * this.size * 3 / 4;
        this.w = Math.sqrt(3) * this.size * 0.5;
        this.gridX = this.ctx.canvas.width / 2 + this.h * this.x;
        this.gridY = this.ctx.canvas.height / 2 + this.w * (this.z - this.y);
        this.rotate = null; //for Action bar
        this.skin = new Image();
        this.skin.src = '';

        // misc parameters
        this.color = "rgb(100, 100, 100)";
        this.isWall = false;
        this.isLava = false;
        this.isOccupied = false;

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
        if (this.isLava) {
            this.color = `rgb(170, 50, 50)`;
        }
        this.hexagon();
    }

    hexagon(img, tileColor = this.color, text, textColor = `rgb(255,255,255)`) {
        let angle = (2 * Math.PI) / 6;
        let x = this.gridX;
        let y = this.gridY;
        this.ctx.beginPath();
        this.ctx.fillStyle = tileColor;
        for (let a = 0; a < 2 * Math.PI; a += angle) {
            let sx = x + Math.cos(a) * this.size;
            let sy = y + Math.sin(a) * this.size;
            this.ctx.lineTo(sx, sy);
        }
        this.ctx.fill();
        this.ctx.stroke();

        if (this.isLava) {
            // console.log(this.isLava)
            this.ctx.drawImage(this.skin, x - this.h / 2, y - this.h / 2, this.h, this.h);
        }
        if ((typeof img) === "object") {
            this.ctx.drawImage(img, x - this.h / 2, y - this.h / 2, this.h, this.h);
        }

        // Cell Id
        // this.ctx.fillStyle = `rgb(0,0,0)`;
        // this.ctx.fillText(this.id > 9 ? "" + this.id : "0" + this.id, x - 6, y + 5);
        // Cell Coords
        // this.ctx.fillStyle = `rgb(100, 255, 100)`;
        // this.ctx.fillText(`${this.x}.${this.y}.${this.z}`, x - 14, y + 20);
        // Demon ID & Player Life
        // if (text >= 0) {
        //     this.ctx.fillStyle = textColor;
        //     this.ctx.fillText(text > 9 ? "" + text : "0" + text, x - 6, y - 9);
        // }
    }
}
