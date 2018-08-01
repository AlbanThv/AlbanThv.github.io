let boardSizeX = 10;
let boardSizeY = 10;
let tiles;
let tileSize;

let mines = 10;

let IMGundiscovered, IMGdiscovered, IMGflag, IMGone, IMGtwo, IMGthree, IMGfour, IMGfive, IMGsix, IMGseven, IMGeight;
function preload() {
  IMGundiscovered = loadImage('Ressources/img/undiscovered.png');
  IMGdiscovered = loadImage('Ressources/img/undiscovered.png');
  IMGflag = loadImage('Ressources/img/flag.png');
  IMGone = loadImage('Ressources/img/1.png');
  IMGtwo = loadImage('Ressources/img/1.png');
  IMGthree = loadImage('Ressources/img/1.png');
  IMGfour = loadImage('Ressources/img/1.png');
  IMGfive = loadImage('Ressources/img/1.png');
  IMGsix = loadImage('Ressources/img/1.png');
  IMGseven = loadImage('Ressources/img/1.png');
  IMGeight = loadImage('Ressources/img/1.png');
}

function setup() {
  console.log("Setup begin");
  if (windowHeight / boardSizeY - 0.2 > ((windowWidth - document.getElementById('left').clientWidth * 2.6) / boardSizeX)) {
    tileSize = (windowWidth - document.getElementById('left').clientWidth * 2.6) / boardSizeX;
  } else {
    tileSize = windowHeight / boardSizeY - 0.2;
  }

  let cnv = createCanvas(boardSizeX * tileSize, boardSizeY * tileSize);
  cnv.style('display', 'block');
  cnv.style('image-rendering', 'pixelated');

  stroke(0); //color
  // noStroke();

  let restart = document.getElementById('restart');
  restart.onclick = fctRestart;

  // Tile Table
  tiles = [];
  for (let y = 0; y < boardSizeY; y++) {
    tiles[y] = [];
    for (let x = 0; x < boardSizeX; x++) {
      tiles[y][x] = new Tile({ x, y });
    }
  }

  while (mines > 0) {
    x = parseInt(random(boardSizeX));
    y = parseInt(random(boardSizeY));
    console.log(y,x,tiles[x][y],tiles[x][y].mine,mines);
    if (!tiles[y][x].mine) {
      tiles[y][x].mine = true;
      mines--;
    }
  }
}

function draw() {
  background(50);
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].show();
    }
  }
}

function windowResized() {
  if (windowHeight / boardSizeY - 0.2 > ((windowWidth - document.getElementById('left').clientWidth * 2.6) / boardSizeX)) {
    tileSize = (windowWidth - document.getElementById('left').clientWidth * 2.6) / boardSizeX;
  } else {
    tileSize = windowHeight / boardSizeY - 0.2;
  }
  resizeCanvas(boardSizeX * tileSize, boardSizeY * tileSize);
}

function fctRestart() {
  boardSizeX = document.getElementById('rows').value;
  boardSizeY = document.getElementById('columns').value;
  mines = document.getElementById('mines').value;

  setup();
}

function mousePressed() {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].click();
    }
  }
}

class Tile {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.col = color(255);
    this.discovered = false;
    this.mineGuess = false;
    this.mine = false;
    this.number = 0;
  }

  click() {
    let d = (mouseX > this.x * tileSize
      && mouseX < (this.x * tileSize + tileSize)
      && mouseY > this.y * tileSize
      && mouseY < (this.y * tileSize + tileSize))

    if (d) {
      if (mouseButton == "right") {
        this.discovered = true;
        console.log(this.x, this.y);
      }
      if (mouseButton == "left") {
        this.mineGuess = !this.mineGuess;
      }
    }
  }

  show() {
    if (this.mine) {
      image(IMGflag, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }
    if (this.mineGuess) {
      image(IMGflag, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else if (!this.discovered) {
      image(IMGundiscovered, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else {
      switch (this.number) {
        case "0":
          image(IMGdiscovered, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "1":
          image(IMGone, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "2":
          image(IMGtwo, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "3":
          image(IMGthree, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "4":
          image(IMGfour, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "5":
          image(IMGfive, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "6":
          image(IMGsix, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "7":
          image(IMGseven, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case "8":
          image(IMGeight, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        default:
          image(IMGdiscovered, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
      }
    }
  }
}
