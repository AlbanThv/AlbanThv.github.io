let boardSizeX = 9;
let boardSizeY = 9;
let tiles;
let tileSize;
let Fin = false;
let Begin = true;
let mines = 10;
let time;
let bodyFlag = false;

let IMGundiscovered, IMGdiscovered, IMGflag, IMGgreenFlag, IMGmine, IMGmineClick, IMGmineWrong;
let IMGone, IMGtwo, IMGthree, IMGfour, IMGfive, IMGsix, IMGseven, IMGeight;
function preload() {
  IMGundiscovered = loadImage('Ressources/img/undiscovered.png');
  IMGdiscovered = loadImage('Ressources/img/discovered.png');
  IMGflag = loadImage('Ressources/img/flag.png');
  IMGgreenFlag = loadImage('Ressources/img/greenFlag.png');
  IMGmine = loadImage('Ressources/img/mine.png');
  IMGmineClick = loadImage('Ressources/img/mineClick.png');
  IMGmineWrong = loadImage('Ressources/img/mineWrong.png');
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
  cnv.class('noEvent');
  cnv.id('canvas');

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
    mines = ~~(boardSizeX * boardSizeY / (4 / 3));
    document.getElementById('mines').value = mines;
  }
  document.getElementById('minesLeft').innerHTML = mines;

  document.body.addEventListener('click', bodyFlagClick);
  let noEvent = document.querySelectorAll('.noEvent'), len = noEvent.length;
  while (--len > -1) { noEvent[len].addEventListener('click', function (e) { e.stopPropagation() }); }

  //click event
  document.getElementById('canvas').addEventListener('mouseup', mouseClick);

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].show();
    }
  }
}

function draw() {
  if (!Fin && !Begin) {
    document.getElementById('time').innerHTML = ~~((Date.now() - time) / 1000);
  }
}

function windowResized() {
  if (windowHeight / boardSizeY - 0.2 > ((windowWidth - document.getElementById('left').clientWidth * 2.7) / boardSizeX)) {
    tileSize = (windowWidth - document.getElementById('left').clientWidth * 2.7) / boardSizeX;
  } else {
    tileSize = windowHeight / boardSizeY - 0.2;
  }
  resizeCanvas(boardSizeX * tileSize, boardSizeY * tileSize);
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].show();
    }
  }
}

function fctRestart() {
  boardSizeX = document.getElementById('rows').value;
  boardSizeY = document.getElementById('columns').value;
  mines = document.getElementById('mines').value;
  document.getElementById('time').innerHTML = 0;
  document.getElementById('GameOver').innerHTML = "";
  document.body.style.background = "black";
  Begin = true;
  bodyFlag = false;
  Fin = false;
  setup();
}

function changePreset() {
  Preset = select('#preset').value();
  for (let el of document.querySelectorAll('.hide')) el.style.display = 'none';
  document.getElementById('left').style.top = "10px";
  switch (Preset) {
    case "1": //Débutant
      document.getElementById('rows').value = 9;
      document.getElementById('columns').value = 9;
      document.getElementById('mines').value = 10;
      break;
    case "2": //Intermédiaire
      document.getElementById('rows').value = 16;
      document.getElementById('columns').value = 16;
      document.getElementById('mines').value = 40;
      break;
    case "3": //Expert
      document.getElementById('rows').value = 24;
      document.getElementById('columns').value = 24;
      document.getElementById('mines').value = 99;
      break;
    case "4": //Custom
      for (let el of document.querySelectorAll('.hide')) el.style.display = 'block';
      document.getElementById('left').style.top = "23px";
      break;
  }
}

function mouseClick(e) {
  //long press
  if (Begin && e.button == 0) {
    let presstimer = null;

    let cancel = function (e) {
      if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
      }
      document.getElementById('GameOver').innerHTML = "cancel";
    };

    let click = function (e) {
      if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
      }
      document.getElementById('GameOver').innerHTML = "click";
    };

    let start = function (e) {
      if (e.type === "click" && e.button !== 0) return;
      document.getElementById('GameOver').innerHTML = "start";

      if (e.button == 0) {
        presstimer = setTimeout(function () {
          if (!Fin) {
            let notMine = 0;
            for (let i = 0; i < tiles.length; i++) {
              for (let j = 0; j < tiles[0].length; j++) {
                tiles[i][j].click(1);
                tiles[i][j].show();
                if (tiles[i][j].discovered) {
                  notMine++;
                }
              }
            }
            if (Fin) {
              GameOver(false);
            } else if (notMine == boardSizeX * boardSizeY - mines) {
              GameOver(true);
            }
            document.getElementById('GameOver').innerHTML = "success";
            console.log("longpressed");
          }
        }, 1000);
      }
    };
    document.getElementById('canvas').addEventListener("mousedown", start);
    document.getElementById('canvas').addEventListener("touchstart", start);
    document.getElementById('canvas').addEventListener("click", click);
    document.getElementById('canvas').addEventListener("mouseout", cancel);
    document.getElementById('canvas').addEventListener("touchend", cancel);
    document.getElementById('canvas').addEventListener("touchleave", cancel);
    document.getElementById('canvas').addEventListener("touchcancel", cancel);
  }

  if (!Fin) {
    let notMine = 0;
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
        tiles[i][j].click(e.button);
        tiles[i][j].show();
        if (tiles[i][j].discovered) {
          notMine++;
        }
      }
    }
    if (Fin) {
      GameOver(false);
    } else if (notMine == boardSizeX * boardSizeY - mines) {
      GameOver(true);
    }
  }
}

function GameOver(win) {
  if (win) {
    Fin = true;
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
        if (tiles[i][j].mine) {
          tiles[i][j].win = true;
          tiles[i][j].show();
        }
      }
    }
    document.getElementById('GameOver').innerHTML = "You won !";
    setTimeout(function () {
      let min = ~~(document.getElementById('time').innerHTML / 60);
      let sec = document.getElementById('time').innerHTML % 60;
      let finalTime = min + (min > 1 ? " minute et " : " minutes et ") + sec + (sec > 1 ? " seconde" : " secondes");
      alert("!!! Vous avez gagné !!!\nVous avez mis " + finalTime);
    }, 100);
  } else {
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
        tiles[i][j].show();
      }
    }
    document.getElementById('GameOver').innerHTML = "You lost !";
    setTimeout(function () {
      alert("Vous avez perdu !")
    }, 200);
  }
}

function bodyFlagClick() {
  bodyFlag = !bodyFlag;
  if (bodyFlag) {
    document.body.style.background = "darkred";
  } else {
    document.body.style.background = "black";
  }
}

function addMines(_x, _y) {
  let mineCount = mines;
  while (mineCount > 0) {
    x = ~~random(boardSizeX);
    y = ~~random(boardSizeY);
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

class Tile {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.col = color(255);
    this.discovered = false;
    this.win = false;
    this.mineGuess = false;
    this.mine = false;
    this.mineClick = false;
    this.neighbour = 0;
  }

  click(button) {
    let d = (mouseX > this.x * tileSize
      && mouseX < (this.x * tileSize + tileSize)
      && mouseY > this.y * tileSize
      && mouseY < (this.y * tileSize + tileSize))

    if (d && !Fin) {
      //Left Click
      if (button == 0 && !this.discovered) {
        if (bodyFlag) {
          bodyFlagClick();
          if (this.mineGuess) {
            this.mineGuess = false;
            document.getElementById('minesLeft').innerHTML = ~~document.getElementById('minesLeft').innerHTML + 1;
          } else {
            this.mineGuess = true;
            if (~~document.getElementById('minesLeft').innerHTML > 0) {
              document.getElementById('minesLeft').innerHTML = ~~document.getElementById('minesLeft').innerHTML - 1;
            } else {
              document.getElementById('minesLeft').innerHTML = 0;
            }
          }
        } else if (!this.mineGuess) {
          this.discovered = true;
          //1er Click
          if (Begin) {
            addMines(this.x, this.y);
            Begin = false;
            time = Date.now();
          }
          //Perdu
          if (this.mine) {
            Fin = true;
            this.mineClick = true;
          }
          //Show all empty
          if (this.voisin() == 0) {
            for (let k = 0; k < boardSizeX; k++) {
              for (let i = 0; i < tiles.length; i++) {
                for (let j = 0; j < tiles[0].length; j++) {
                  tiles[i][j].showEmpty();
                  tiles[i][j].show();
                }
              }
            }
          }
        }
      }

      //Right Click
      if (button == 2 && !this.discovered) {
        if (this.mineGuess) {
          this.mineGuess = false;
          document.getElementById('minesLeft').innerHTML = ~~document.getElementById('minesLeft').innerHTML + 1;
        } else {
          this.mineGuess = true;
          if (~~document.getElementById('minesLeft').innerHTML > 0) {
            document.getElementById('minesLeft').innerHTML = ~~document.getElementById('minesLeft').innerHTML - 1;
          } else {
            document.getElementById('minesLeft').innerHTML = 0;
          }
        }
      }

      //Middle Click
      if (button == 1 && this.discovered && this.voisin() == this.voisinGuess()) {
        if (this.x == 0 && this.y == 0) {
          this.chord(this.x + 1, this.y)
          this.chord(this.x, this.y + 1)
          this.chord(this.x + 1, this.y + 1)
        } else if (this.y == boardSizeY - 1 && this.x == 0) {
          this.chord(this.x, this.y - 1)
          this.chord(this.x + 1, this.y - 1)
          this.chord(this.x + 1, this.y)
        } else if (this.y == 0 && this.x == boardSizeX - 1) {
          this.chord(this.x - 1, this.y)
          this.chord(this.x - 1, this.y + 1)
          this.chord(this.x, this.y + 1)
        } else if (this.y == boardSizeY - 1 && this.x == boardSizeX - 1) {
          this.chord(this.x - 1, this.y - 1)
          this.chord(this.x, this.y - 1)
          this.chord(this.x - 1, this.y)
        } else if (this.y == 0) {
          this.chord(this.x - 1, this.y)
          this.chord(this.x + 1, this.y)
          this.chord(this.x - 1, this.y + 1)
          this.chord(this.x, this.y + 1)
          this.chord(this.x + 1, this.y + 1)
        } else if (this.y == boardSizeY - 1) {
          this.chord(this.x - 1, this.y - 1)
          this.chord(this.x, this.y - 1)
          this.chord(this.x + 1, this.y - 1)
          this.chord(this.x - 1, this.y)
          this.chord(this.x + 1, this.y)
        } else if (this.x == 0) {
          this.chord(this.x, this.y - 1)
          this.chord(this.x + 1, this.y - 1)
          this.chord(this.x + 1, this.y)
          this.chord(this.x + 1, this.y + 1)
          this.chord(this.x, this.y + 1)
        } else if (this.x == boardSizeX - 1) {
          this.chord(this.x - 1, this.y - 1)
          this.chord(this.x, this.y - 1)
          this.chord(this.x - 1, this.y)
          this.chord(this.x - 1, this.y + 1)
          this.chord(this.x, this.y + 1)
        } else {
          this.chord(this.x - 1, this.y - 1)
          this.chord(this.x, this.y - 1)
          this.chord(this.x + 1, this.y - 1)
          this.chord(this.x - 1, this.y)
          this.chord(this.x + 1, this.y)
          this.chord(this.x - 1, this.y + 1)
          this.chord(this.x, this.y + 1)
          this.chord(this.x + 1, this.y + 1)
        }
      }
    }
  }

  chord(_j, _i) {
    if (!tiles[_i][_j].mineGuess && !tiles[_i][_j].discovered) {
      tiles[_i][_j].discovered = true;
      tiles[_i][_j].show();
      if (tiles[_i][_j].voisin() == 0) {
        for (let k = 0; k < boardSizeX; k++) {
          for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[0].length; j++) {
              tiles[i][j].showEmpty();
              tiles[i][j].show();
            }
          }
        }
      }
      if (tiles[_i][_j].mine) {
        Fin = true;
        tiles[_i][_j].mineClick = true;
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

  voisinGuess() {
    let guess = 0;
    if (this.y - 1 >= 0 && this.x - 1 >= 0)
      if (tiles[this.y - 1][this.x - 1].mineGuess) { guess++; }
    if (this.y - 1 >= 0)
      if (tiles[this.y - 1][this.x].mineGuess) { guess++; }
    if (this.y - 1 >= 0 && this.x + 1 < boardSizeX)
      if (tiles[this.y - 1][this.x + 1].mineGuess) { guess++; }
    if (this.x - 1 >= 0)
      if (tiles[this.y][this.x - 1].mineGuess) { guess++; }
    if (this.x + 1 < boardSizeX)
      if (tiles[this.y][this.x + 1].mineGuess) { guess++; }
    if (this.y + 1 < boardSizeY && this.x - 1 >= 0)
      if (tiles[this.y + 1][this.x - 1].mineGuess) { guess++; }
    if (this.y + 1 < boardSizeY)
      if (tiles[this.y + 1][this.x].mineGuess) { guess++; }
    if (this.y + 1 < boardSizeY && this.x + 1 < boardSizeX)
      if (tiles[this.y + 1][this.x + 1].mineGuess) { guess++; }
    return guess;
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
    }
    if (Fin) {
      if (this.mineClick) {
        image(IMGmineClick, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      } else if (this.mineGuess && !this.mine) {
        image(IMGmineWrong, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      } else if (this.mine) {
        image(IMGmine, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      }
      if (this.win) {
        image(IMGgreenFlag, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      }
    }
  }
}
