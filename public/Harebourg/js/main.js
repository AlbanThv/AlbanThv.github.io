let tiles = [];
let tileSize = 30;
let TilePerso = {x:-1, y:-1}
let TileCible = {x:-1, y:-1}
let TileSort = {x:-1, y:-1}
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
  let cnv = createCanvas(20*30+2, 21*30+2);
  cnv.style('display', 'block');
  let Case = select('#tile').value();
  let Pi = select('#Pi').value();
  noStroke();
  background(50);

  for (let y = 2; y < height; y += tileSize) {
    for (let x = 2; x < width; x += tileSize) {
      tiles.push(new Tile(x, y));
    }
  }


}

function draw() {
  Case = select('#tile').value();
  Pi = select('#Pi').value();

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
    tiles[i].clicked();
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

  this.clicked = function() {
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
}

let isEqual = function (value, other) {

	// Get the value type
	let type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	let compare = function (item1, item2) {

		// Get the object type
		let itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (let i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (let key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};