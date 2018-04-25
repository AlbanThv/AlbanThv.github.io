let tiles = [[]];
let tileSize = 16;

let Gen = 0;
let Pause = true;
let btnPause;
let btnPauseCtx = "Play";

let Step = false;
let btnStep;

let btnClear;

function setup() {
  let cnv = createCanvas(floor((windowWidth-16)/16)*16, floor((windowHeight-16)/16)*16);
  cnv.style('display', 'block');
  // noStroke();

  for (let y = tileSize; y < height; y += tileSize) {
    tiles[y/16-1] = [];
    for (let x = tileSize; x < width; x += tileSize) {
      tiles[y/16-1][x/16-1] = new Tile(x, y);
    }
  }

  btnPause = document.getElementById('pause');
  btnPause.onclick = fctplay;

  btnStep = document.getElementById('step');
  btnStep.onclick = fctstep;

  btnClear = document.getElementById('clear');
  btnClear.onclick = fctclear;
}

function draw() {
  btnPause.textContent = btnPauseCtx + " (Gen:" + Gen + ")";
  background(0);
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      tiles[i][j].show();
    }
  }

  if (!Pause || Step) {
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        let neighbour = 0;

        if (i == 0 && j == 0) {
          tileNO = tiles[tiles.length-1][tiles[i].length-1].isAlive;
        } else if (i == 0) {
          tileNO = tiles[tiles.length-1][j-1].isAlive;
        } else if (j == 0) {
          tileNO = tiles[i-1][tiles[i].length-1].isAlive;
        } else {
          tileNO = tiles[i-1][j-1].isAlive;
        }

        if (i == 0) {
          tileN = tiles[tiles.length-1][j].isAlive;
        } else {
          tileN = tiles[i-1][j].isAlive;
        }

        if (i == 0 && j == tiles[i].length-1) {
          tileNE = tiles[tiles.length-1][0].isAlive;
        } else if (i == 0) {
          tileNE = tiles[tiles.length-1][j+1].isAlive;
        } else if (j == tiles[i].length-1) {
          tileNE = tiles[i-1][0].isAlive;
        } else {
          tileNE = tiles[i-1][j+1].isAlive;
        }

        if (j == 0) {
          tileO = tiles[i][tiles[i].length-1].isAlive;
        } else {
          tileO = tiles[i][j-1].isAlive;
        }

        if (j == tiles[i].length-1) {
          tileE = tiles[i][0].isAlive;
        } else {
          tileE = tiles[i][j+1].isAlive;
        }

        if (i == tiles.length-1 && j == 0) {
          tileSO = tiles[0][tiles[i].length-1].isAlive;
        } else if (i == tiles.length-1) {
          tileSO = tiles[0][j-1].isAlive;
        } else if (j == 0) {
          tileSO = tiles[i+1][tiles[i].length-1].isAlive;
        } else {
          tileSO = tiles[i+1][j-1].isAlive;
        }

        if (i == tiles.length-1) {
          tileS = tiles[0][j].isAlive;
        } else {
          tileS = tiles[i+1][j].isAlive;
        }

        if (i == tiles.length-1 && j == tiles[i].length-1) {
          tileSE = tiles[0][0].isAlive;
        } else if (i == tiles.length-1) {
          tileSE = tiles[0][j+1].isAlive;
        } else if (j == tiles[i].length-1) {
          tileSE = tiles[i+1][0].isAlive;
        } else {
          tileSE = tiles[i+1][j+1].isAlive;
        }

        neighbour =
          tileNO
        + tileN
        + tileNE
        + tileO
        + tileE
        + tileSO
        + tileS
        + tileSE

        if (tiles[i][j].isAlive == 0 && neighbour == 3) {
          tiles[i][j].nextStep = 1;
        }
        if (tiles[i][j].isAlive == 1 && neighbour == 2 || neighbour == 3) {
          tiles[i][j].nextStep = 1;
        } else if (tiles[i][j].isAlive == 1) {
          tiles[i][j].nextStep = 0;
        }
      }
    }

    Gen++;
    Step = false;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    fctplay();
  } else if (keyCode === 32) {
    fctstep();
  } else if (keyCode === BACKSPACE || keyCode === DELETE) {
    fctclear();
  }
}

function fctplay() {
  Pause = !Pause
  if (Pause) {
    btnPauseCtx = "Play";
  } else {
    btnPauseCtx = "Stop";
  }
  btnPause.blur()
}

function fctstep() {
  Step = !Step
  btnStep.blur()
}

function fctclear() {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      tiles[i][j].nextStep = 0;
      tiles[i][j].show();
    }
  }
  Gen = 0;
  Pause = true;
  btnPauseCtx = "Play";
  btnClear.blur()
}

function mousePressed() {
  mouse();
}

function mouseDragged() {
  mouse();
}

function mouse() {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      tiles[i][j].drag();
    }
  }
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.gridX = (x-tileSize)/tileSize;
    this.gridY = (y-tileSize)/tileSize;

    this.col = color(0);
    this.isAlive = 0;
    this.nextStep = 0;
  }

  show() {
    this.isAlive = this.nextStep;
    if (this.isAlive) {
      this.col = color(255,0,0,150);
    } else {
      this.col = color(160,150);
    }
    fill(this.col);
    rect(this.x, this.y, tileSize, tileSize);
  }

  drag() {
    let d = (mouseX > this.x
          && mouseX < (this.x + tileSize)
          && mouseY > this.y
          && mouseY < (this.y + tileSize))
    if (d) {
      if (mouseButton == "left") {
        this.nextStep = 1;
      }
      if (mouseButton == "right") {
        this.nextStep = 0;
      }
    }
  }
}
