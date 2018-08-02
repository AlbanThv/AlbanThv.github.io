let boardSizeX = 10;
let boardSizeY = 10;
let tiles;
let tileSize;
let Fin = false;
let Begin = true;
let mines = 10;
let time;

let IMGundiscovered, IMGdiscovered, IMGflag, IMGmine, IMGone, IMGtwo, IMGthree, IMGfour, IMGfive, IMGsix, IMGseven, IMGeight;
function preload() {
  IMGundiscovered = loadImage('Ressources/img/undiscovered.png');
  IMGdiscovered = loadImage('Ressources/img/discovered.png');
  IMGflag = loadImage('Ressources/img/flag.png');
  IMGmine = loadImage('Ressources/img/mine.png');
  IMGone = loadImage('Ressources/img/1.png');
  IMGtwo = loadImage('Ressources/img/2.png');
  IMGthree = loadImage('Ressources/img/3.png');
  IMGfour = loadImage('Ressources/img/4.png');
  IMGfive = loadImage('Ressources/img/5.png');
  IMGsix = loadImage('Ressources/img/6.png');
  IMGseven = loadImage('Ressources/img/7.png');
  IMGeight = loadImage('Ressources/img/8.png');
}

function setup() {
  console.log("Setup begin");
  if (windowHeight / boardSizeY - 0.2 > ((windowWidth - document.getElementById('left').clientWidth * 2.8) / boardSizeX)) {
    tileSize = (windowWidth - document.getElementById('left').clientWidth * 2.8) / boardSizeX;
  } else {
    tileSize = windowHeight / boardSizeY - 0.2;
  }

  let cnv = createCanvas(boardSizeX * tileSize, boardSizeY * tileSize);
  cnv.style('display', 'block');
  cnv.style('image-rendering', 'pixelated');

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

  //too much mines
  if (mines > boardSizeX * boardSizeY / (4 / 3)) {
    mines = parseInt(boardSizeX * boardSizeY / (4 / 3));
    document.getElementById('mines').value = mines;
  }
  document.getElementById('minesLeft').innerHTML = mines;
}

function draw() {
  // background(50);
  let notMine = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].showEmpty();
      tiles[i][j].show();
      if (tiles[i][j].discovered) {
        notMine++;
      }
    }
  }
  win(notMine);
  if (!Fin && !Begin) {
    document.getElementById('time').innerHTML = Math.floor((Date.now() - time) / 1000);
  }
}

function windowResized() {
  if (windowHeight / boardSizeY - 0.2 > ((windowWidth - document.getElementById('left').clientWidth * 2.7) / boardSizeX)) {
    tileSize = (windowWidth - document.getElementById('left').clientWidth * 2.7) / boardSizeX;
  } else {
    tileSize = windowHeight / boardSizeY - 0.2;
  }
  resizeCanvas(boardSizeX * tileSize, boardSizeY * tileSize);
}

function fctRestart() {
  boardSizeX = document.getElementById('rows').value;
  boardSizeY = document.getElementById('columns').value;
  mines = document.getElementById('mines').value;
  Fin = false;
  Begin = true;
  setup();
}

function mousePressed() {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].click();
    }
  }
}

function addMines(_x, _y) {
  let mineCount = mines;
  while (mineCount > 0) {
    x = parseInt(random(boardSizeX));
    y = parseInt(random(boardSizeY));
    if (!tiles[y][x].mine) {
      tiles[y][x].mine = true;
      mineCount--;
    }
    if (x == _x && y == _y && tiles[y][x].mine) {
      tiles[y][x].mine = false;
      mineCount++;
    }
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
        if (tiles[i][j].mine) {
          if (tiles[i][j].voisin() == 8) {
            tiles[i][j].mine = false;
            mineCount++;
          } else if ((i == 0
            || i == boardSizeY - 1
            || j == 0
            || j == boardSizeX - 1)
            && tiles[i][j].voisin() == 5) {
            tiles[i][j].mine = false;
            mineCount++;
          } else if ((j == 0 && i == 0
            || i == boardSizeY - 1 && j == 0
            || i == 0 && j == boardSizeX - 1
            || i == boardSizeY - 1 && j == boardSizeX - 1)
            && tiles[i][j].voisin() == 3) {
            tiles[i][j].mine = false;
            mineCount++;
          }
        }
        tiles[i][j].voisin();
      }
    }
  }
}

function win(notMine) {
  if (notMine == boardSizeX * boardSizeY - mines && !Fin) {
    Fin = true;
    setTimeout(function () {
      alert("!!! Vous avez gagné !!!\nVous avez mis " + document.getElementById('time').innerHTML + " secondes")
    }, 100);
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
    this.neighbour = 0;
  }

  click() {
    let d = (mouseX > this.x * tileSize
      && mouseX < (this.x * tileSize + tileSize)
      && mouseY > this.y * tileSize
      && mouseY < (this.y * tileSize + tileSize))

    if (d && !Fin) {
      if (mouseButton == "left") {
        if (!this.mineGuess && !this.discovered) {
          this.discovered = true;
          if (Begin) {
            addMines(this.x, this.y);
            Begin = false;
            time = Date.now();
          }
          if (this.mine) {
            Fin = true;
            for (let i = 0; i < tiles.length; i++) {
              for (let j = 0; j < tiles[0].length; j++) {
                if (tiles[i][j].mine) {
                  tiles[i][j].discovered = true;
                }
              }
            }
            setTimeout(function () {
              alert("Vous avez perdu !")
            }, 100);
          }
          this.showEmpty(this.x, this.y);
        }
      }
      if (mouseButton == "right") {
        if (!this.discovered) {
          if (this.mineGuess) {
            this.mineGuess = false;
            document.getElementById('minesLeft').innerHTML = parseInt(document.getElementById('minesLeft').innerHTML) + 1;
          } else {
            this.mineGuess = true;
            if (parseInt(document.getElementById('minesLeft').innerHTML) > 0) {
              document.getElementById('minesLeft').innerHTML = parseInt(document.getElementById('minesLeft').innerHTML) - 1;
            } else {
              document.getElementById('minesLeft').innerHTML = 0;
            }
          }
        }
      }
    }
  }

  voisin() {
    this.neighbour = 0;
    if (this.y - 1 >= 0 && this.x - 1 >= 0)
      if (tiles[this.y - 1][this.x - 1].mine) { this.neighbour++; }
    if (this.y - 1 >= 0)
      if (tiles[this.y - 1][this.x].mine) { this.neighbour++; }
    if (this.y - 1 >= 0 && this.x + 1 < boardSizeX)
      if (tiles[this.y - 1][this.x + 1].mine) { this.neighbour++; }
    if (this.x - 1 >= 0)
      if (tiles[this.y][this.x - 1].mine) { this.neighbour++; }
    if (this.x + 1 < boardSizeX)
      if (tiles[this.y][this.x + 1].mine) { this.neighbour++; }
    if (this.y + 1 < boardSizeY && this.x - 1 >= 0)
      if (tiles[this.y + 1][this.x - 1].mine) { this.neighbour++; }
    if (this.y + 1 < boardSizeY)
      if (tiles[this.y + 1][this.x].mine) { this.neighbour++; }
    if (this.y + 1 < boardSizeY && this.x + 1 < boardSizeX)
      if (tiles[this.y + 1][this.x + 1].mine) { this.neighbour++; }
    return this.neighbour;
  }

  showEmpty() {
    if (this.voisin() == 0 && this.discovered && !this.mine) {
      if (this.x == 0 && this.y == 0) {
        if (!tiles[this.y][this.x + 1].mineGuess) tiles[this.y][this.x + 1].discovered = true;
        if (!tiles[this.y + 1][this.x].mineGuess) tiles[this.y + 1][this.x].discovered = true;
        if (!tiles[this.y + 1][this.x + 1].mineGuess) tiles[this.y + 1][this.x + 1].discovered = true;
      } else if (this.y == boardSizeY - 1 && this.x == 0) {
        if (!tiles[this.y - 1][this.x].mineGuess) tiles[this.y - 1][this.x].discovered = true;
        if (!tiles[this.y - 1][this.x + 1].mineGuess) tiles[this.y - 1][this.x + 1].discovered = true;
        if (!tiles[this.y][this.x + 1].mineGuess) tiles[this.y][this.x + 1].discovered = true;
      } else if (this.y == 0 && this.x == boardSizeX - 1) {
        if (!tiles[this.y][this.x - 1].mineGuess) tiles[this.y][this.x - 1].discovered = true;
        if (!tiles[this.y + 1][this.x - 1].mineGuess) tiles[this.y + 1][this.x - 1].discovered = true;
        if (!tiles[this.y + 1][this.x].mineGuess) tiles[this.y + 1][this.x].discovered = true;
      } else if (this.y == boardSizeY - 1 && this.x == boardSizeX - 1) {
        if (!tiles[this.y - 1][this.x - 1].mineGuess) tiles[this.y - 1][this.x - 1].discovered = true;
        if (!tiles[this.y - 1][this.x].mineGuess) tiles[this.y - 1][this.x].discovered = true;
        if (!tiles[this.y][this.x - 1].mineGuess) tiles[this.y][this.x - 1].discovered = true;
      } else if (this.y == 0) {
        if (!tiles[this.y][this.x - 1].mineGuess) tiles[this.y][this.x - 1].discovered = true;
        if (!tiles[this.y][this.x + 1].mineGuess) tiles[this.y][this.x + 1].discovered = true;
        if (!tiles[this.y + 1][this.x - 1].mineGuess) tiles[this.y + 1][this.x - 1].discovered = true;
        if (!tiles[this.y + 1][this.x].mineGuess) tiles[this.y + 1][this.x].discovered = true;
        if (!tiles[this.y + 1][this.x + 1].mineGuess) tiles[this.y + 1][this.x + 1].discovered = true;
      } else if (this.y == boardSizeY - 1) {
        if (!tiles[this.y - 1][this.x - 1].mineGuess) tiles[this.y - 1][this.x - 1].discovered = true;
        if (!tiles[this.y - 1][this.x].mineGuess) tiles[this.y - 1][this.x].discovered = true;
        if (!tiles[this.y - 1][this.x + 1].mineGuess) tiles[this.y - 1][this.x + 1].discovered = true;
        if (!tiles[this.y][this.x - 1].mineGuess) tiles[this.y][this.x - 1].discovered = true;
        if (!tiles[this.y][this.x + 1].mineGuess) tiles[this.y][this.x + 1].discovered = true;
      } else if (this.x == 0) {
        if (!tiles[this.y - 1][this.x].mineGuess) tiles[this.y - 1][this.x].discovered = true;
        if (!tiles[this.y - 1][this.x + 1].mineGuess) tiles[this.y - 1][this.x + 1].discovered = true;
        if (!tiles[this.y][this.x + 1].mineGuess) tiles[this.y][this.x + 1].discovered = true;
        if (!tiles[this.y + 1][this.x].mineGuess) tiles[this.y + 1][this.x].discovered = true;
        if (!tiles[this.y + 1][this.x + 1].mineGuess) tiles[this.y + 1][this.x + 1].discovered = true;
      } else if (this.x == boardSizeX - 1) {
        if (!tiles[this.y - 1][this.x - 1].mineGuess) tiles[this.y - 1][this.x - 1].discovered = true;
        if (!tiles[this.y - 1][this.x].mineGuess) tiles[this.y - 1][this.x].discovered = true;
        if (!tiles[this.y][this.x - 1].mineGuess) tiles[this.y][this.x - 1].discovered = true;
        if (!tiles[this.y + 1][this.x - 1].mineGuess) tiles[this.y + 1][this.x - 1].discovered = true;
        if (!tiles[this.y + 1][this.x].mineGuess) tiles[this.y + 1][this.x].discovered = true;
      } else {
        if (!tiles[this.y - 1][this.x - 1].mineGuess) tiles[this.y - 1][this.x - 1].discovered = true;
        if (!tiles[this.y - 1][this.x].mineGuess) tiles[this.y - 1][this.x].discovered = true;
        if (!tiles[this.y - 1][this.x + 1].mineGuess) tiles[this.y - 1][this.x + 1].discovered = true;
        if (!tiles[this.y][this.x - 1].mineGuess) tiles[this.y][this.x - 1].discovered = true;
        if (!tiles[this.y][this.x + 1].mineGuess) tiles[this.y][this.x + 1].discovered = true;
        if (!tiles[this.y + 1][this.x - 1].mineGuess) tiles[this.y + 1][this.x - 1].discovered = true;
        if (!tiles[this.y + 1][this.x].mineGuess) tiles[this.y + 1][this.x].discovered = true;
        if (!tiles[this.y + 1][this.x + 1].mineGuess) tiles[this.y + 1][this.x + 1].discovered = true;
      }
    }
  }

  show() {
    if (this.mineGuess) {
      image(IMGflag, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else if (!this.discovered) {
      image(IMGundiscovered, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else {
      switch (this.neighbour) {
        case 0:
          image(IMGdiscovered, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 1:
          image(IMGone, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 2:
          image(IMGtwo, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 3:
          image(IMGthree, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 4:
          image(IMGfour, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 5:
          image(IMGfive, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 6:
          image(IMGsix, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 7:
          image(IMGseven, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        case 8:
          image(IMGeight, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
        default:
          image(IMGdiscovered, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
          break;
      }
      if (this.mine) {
        image(IMGmine, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      }
    }
  }
}
