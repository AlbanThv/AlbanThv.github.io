let tiles = [];
let tileSize = 30;
let mapSize = 21;
let TilePerso = {x:-1, y:-1};
let TileCible = {x:-mapSize, y:-mapSize};
let TileSort  = {x:-1, y:-1};
let Carte = [];
Carte[1] = "000000000000000000000" //Harebourg
          +"000000001100000000000"
          +"000001111122111000000"
          +"000011111110111100000"
          +"000111111111111110000"
          +"000112211111111111000"
          +"001112211111111111000"
          +"001112211111111111200"
          +"011110011111111111100"
          +"011111111122111111110"
          +"011111111122111111110"
          +"011111111111110220110"
          +"001111111111110221110"
          +"001111111111111111100"
          +"001120111111111111100"
          +"000111111111111111100"
          +"000011111111111111000"
          +"000001111111111110000"
          +"000000111111112200000"
          +"000000000111100000000"
          +"000000000000000000000";
Carte[2] = "000000000000000000000" //Nileza
          +"000000001111100000000"
          +"000000221111111100000"
          +"000002111111101110000"
          +"000011111111121111000"
          +"000111111111111111100"
          +"000111121111111111100"
          +"001111121111111111100"
          +"001111111111111111100"
          +"001111111112211111100"
          +"001111111112211111100"
          +"001111101111111111100"
          +"000111111111111111100"
          +"000111111111111011100"
          +"000111111111111211100"
          +"000011111111111111220"
          +"000001111111111111000"
          +"000000111111111111000"
          +"000000020111111110000"
          +"000000000011111000000"
          +"000000000000000000000";


function setup() {
  let cnv = createCanvas(mapSize*tileSize+2, mapSize*tileSize+2);
  cnv.style('display', 'block');
  noStroke();
  background(50);

  let Pi = Array.from(document.getElementsByName("Pi")).find(r => r.checked).value;

  for (let y = 2; y < height; y += tileSize) {
    for (let x = 2; x < width; x += tileSize) {
      tiles.push(new Tile(x, y));
    }
  }
}

function draw() {
  Pi = Array.from(document.getElementsByName("Pi")).find(r => r.checked).value;
  CarteIndex = select("#map").value();

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
  let impair = 1;
  for (let i = 0; i < tiles.length; i++) {
    if (i%(21*21) == 0) {
      impair++;
    }
    if (Carte[CarteIndex][i] == "1") {
      if ((i+impair)%2 == 0) {
        tiles[i].col = color(202,155,81); //clair
      } else {
        tiles[i].col = color(187,138,64); //sombre
      }
    } else if (Carte[CarteIndex][i] == "2") {
      tiles[i].col = color(136,81,18);
    } else if (Carte[CarteIndex][i] == "0") {
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

function Tile(x, y) {
  this.x = x;
  this.y = y;
  this.col = color(255,100);
  this.gridX = (x-2)/tileSize;
  this.gridY = (y-2)/tileSize;

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
      if (mouseButton == "right") {
        TilePerso.x = this.gridX;
        TilePerso.y = this.gridY;
      }
      if (mouseButton == "left") {
        TileCible.x = this.gridX;
        TileCible.y = this.gridY;
      }
    }
  }
}
