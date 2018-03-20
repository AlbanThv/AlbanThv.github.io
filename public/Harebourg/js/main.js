let tiles = [];
let tileSize = 30;
let TilePerso = {x:-1, y:-1};
let TileCible = {x:-20, y:-20};
let TileSort  = {x:-1, y:-1};
let nileza = "00000000000000000000"
            +"00000001111100000000"
            +"00000221111111100000"
            +"00002111111101110000"
            +"00011111111121111000"
            +"00111111111111111100"
            +"00111121111111111100"
            +"01111121111111111100"
            +"01111111111111111100"
            +"01111111112211111100"
            +"01111111112211111100"
            +"01111101111111111100"
            +"00111111111111111100"
            +"00111111111111011100"
            +"00111111111111211100"
            +"00011111111111111220"
            +"00001111111111111000"
            +"00000111111111111000"
            +"00000020111111110000"
            +"00000000011111000000"
            +"00000000000000000000"
;

function setup() {
  let cnv = createCanvas(20*tileSize+2, 21*tileSize+2);
  cnv.style('display', 'block');
  noStroke();
  background(50);

  let Case = select('#tile').value();
  let Pi = Array.from(document.getElementsByName("Pi")).find(r => r.checked).value;

  for (let y = 2; y < height; y += tileSize) {
    for (let x = 2; x < width; x += tileSize) {
      tiles.push(new Tile(x, y));
    }
  }
}

function draw() {
  Case = select('#tile').value();
  Pi = Array.from(document.getElementsByName("Pi")).find(r => r.checked).value;

  if (Pi == "Gauche") {
      if (TileCible.x>=TilePerso.x && TileCible.y<=TilePerso.y) {
        TileSort.x = TilePerso.x-abs(TilePerso.y-TileCible.y);
        TileSort.y = TilePerso.y-abs(TilePerso.x-TileCible.x);
      } else {
        TileSort.x = TilePerso.x-(TilePerso.y-TileCible.y);
        TileSort.y = TilePerso.y+(TilePerso.x-TileCible.x);
      }
  } else if (Pi == "Droite") {
    if (TileCible.x>=TilePerso.x && TileCible.y<=TilePerso.y) {
      TileSort.x = TilePerso.x+abs(TilePerso.y-TileCible.y);
      TileSort.y = TilePerso.y+abs(TilePerso.x-TileCible.x);
    } else {
      TileSort.x = TilePerso.x+(TilePerso.y-TileCible.y);
      TileSort.y = TilePerso.y-(TilePerso.x-TileCible.x);
    }
  } else if (Pi == "Envers") {
    if (TileCible.x>=TilePerso.x && TileCible.y>=TilePerso.y) {
      TileSort.x = TilePerso.x-abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y-abs(TilePerso.y-TileCible.y);
    } else if (TileCible.x>=TilePerso.x && TileCible.y<=TilePerso.y) {
      TileSort.x = TilePerso.x-abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y+abs(TilePerso.y-TileCible.y);
    } else if (TileCible.x<=TilePerso.x && TileCible.y<=TilePerso.y) {
      TileSort.x = TilePerso.x+abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y+abs(TilePerso.y-TileCible.y);
    } else if (TileCible.x<=TilePerso.x && TileCible.y>=TilePerso.y) {
      TileSort.x = TilePerso.x+abs(TilePerso.x-TileCible.x);
      TileSort.y = TilePerso.y-abs(TilePerso.y-TileCible.y);
    }
  }

  for (let i = 0; i < tiles.length; i++) {
    if (nileza[i] == "1") {
      tiles[i].col = color(202,155,81);
    } else if (nileza[i] == "2") {
      tiles[i].col = color(152,90,21);
    } else if (nileza[i] == "0") {
      tiles[i].col = color(0);
    }

    if (tiles[i].gridX == TilePerso.x && tiles[i].gridY == TilePerso.y) {
      tiles[i].col = color(0,255,0);
    }
    if (tiles[i].gridX == TileCible.x && tiles[i].gridY == TileCible.y) {
      tiles[i].col = color(255,0,0);
    }
    if (tiles[i].gridX == TileSort.x && tiles[i].gridY == TileSort.y) {
      tiles[i].col = color(255,0,255);
    }

    tiles[i].show();
  }
}

function mousePressed() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].drag();
  }
}

function mouseDragged() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].drag();
  }
}

function mouseReleased() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].release();
  }
}

function Tile(x, y) {
  this.gridX = (x-2)/tileSize;
  this.gridY = (y-2)/tileSize;
  this.x = x;
  this.y = y;
  this.col = color(255,100);

  this.show = function() {
    fill(this.col);
    rect(this.x, this.y, 28, 28);
  }

  this.drag = function() {
    let d = (mouseX > this.x
          && mouseX < (this.x + tileSize)
          && mouseY > this.y
          && mouseY < (this.y + tileSize))
    if (d) {
      if (Case == "Personnage") {
        TilePerso.x = this.gridX;
        TilePerso.y = this.gridY;
      } else if (Case == "Cible") {
        TileCible.x = this.gridX;
        TileCible.y = this.gridY;
      }
    }
  }

  this.release = function() {
    let d = (mouseX > this.x
          && mouseX < (this.x + tileSize)
          && mouseY > this.y
          && mouseY < (this.y + tileSize))
    if (d) {
      if (Case == "Personnage") {
        //TileCible = {x:-20, y:-20};
        select('#tile').value("Cible");
      }
    }
  }
}
