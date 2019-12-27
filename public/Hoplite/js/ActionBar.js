import Cell from "./Cell.js";

export default class ActionBar {
    constructor(canvasDOM, ctx, mapCellSize) {
        this.ctx = ctx;
        this.canvasDOM = canvasDOM;

        this.chopX = 5;
        this.mapCellFitWidth = ((this.chopX * 2 - 1) * 2) + (this.chopX * 2);
        this.ctx.canvas.width = (mapCellSize + 1) / 2 * this.mapCellFitWidth;
        this.cellSize = this.ctx.canvas.width / this.mapCellFitWidth * 3;
        this.cellWidth = this.cellSize * Math.sqrt(3);
        this.cellHeight = this.cellSize * 2;

        this.buttons = [];
        this.buttons.push(new Cell({x: -1.5, y: 0, z: 0, size: this.cellSize, ctx: this.ctx}));
        this.buttons.push(new Cell({x:    0, y: 0, z: 0, size: this.cellSize, ctx: this.ctx}));
        this.buttons.push(new Cell({x:  1.5, y: 0, z: 0, size: this.cellSize, ctx: this.ctx}));

        // drawing parameters
        this.w = 2 * this.cellSize * 3 / 4;
        this.h = Math.sqrt(3) * this.cellSize * 0.5;
    }

    show(img, maxHP, currHP) {
        this.buttons.forEach(button => {
            let angle = (2 * Math.PI) / 6;
            let x = this.ctx.canvas.width / 2 + this.w * button.x;
            let y = this.ctx.canvas.height - this.cellSize - 5;
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

        let size = this.cellSize - 5;
        for (let i = 0; i < maxHP; i++) {
            if (i < currHP) {
                this.ctx.drawImage(img.Heart, 5 + size * i, 0, size, size);
            } else {
                this.ctx.drawImage(img.HeartG, 5 + size * i, 0, size, size);
            }
        }
    }

    buttonClick(e) {
        let totalOffsetX = 0;
        let totalOffsetY = 0;
        let currentElement = this.canvasDOM;

        do{
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while(currentElement = currentElement.offsetParent)

        let canvasX = e.pageX - totalOffsetX;
        let canvasY = e.pageY - totalOffsetY;


        let y = this.ctx.canvas.height - this.cellSize - 5;
        let top = y - this.cellHeight / 2;
        let bottom = y + this.cellHeight / 2;

        let x = this.ctx.canvas.width / 2 + this.w * this.buttons[0].x;
        let gauche = x - this.cellWidth / 2;
        let droite = x + this.cellWidth / 2;
        if (canvasX >= gauche && canvasX <= droite &&
            canvasY >= top    && canvasY <= bottom ) {
                // Bouton de gauche
                if (this.buttons[0].rotate !== null) {
                    this.buttons[0].rotate = null;
                } else if (this.buttons[1].rotate === null && this.buttons[2].rotate === null) {
                    this.buttons[0].rotate = 0;
                }
        }

        x = this.ctx.canvas.width / 2 + this.w * this.buttons[1].x;
        gauche = x - this.cellWidth / 2;
        droite = x + this.cellWidth / 2;
        if (canvasX >= gauche && canvasX <= droite &&
            canvasY >= top    && canvasY <= bottom ) {
                // Bouton du milieu
                if (this.buttons[1].rotate !== null) {
                    this.buttons[1].rotate = null;
                } else if (this.buttons[0].rotate === null && this.buttons[2].rotate === null) {
                    this.buttons[1].rotate = 0;
                }
        }

        x = this.ctx.canvas.width / 2 + this.w * this.buttons[2].x;
        gauche = x - this.cellWidth / 2;
        droite = x + this.cellWidth / 2;
        if (canvasX >= gauche && canvasX <= droite &&
            canvasY >= top    && canvasY <= bottom ) {
                // Bouton de droite
                if (this.buttons[2].rotate !== null) {
                    this.buttons[2].rotate = null;
                } else if (this.buttons[0].rotate === null && this.buttons[1].rotate === null) {
                    this.buttons[2].rotate = 0;
                }
        }
    }
}