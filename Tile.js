
class Tile {
    constructor() {
      this.mine = false;    // does the tile have a mine?
      this.revealed = false; // is the tile revealed?
      this.flagged = false;  // is the tile flagged?
      this.adjacentMines = 0; // number of mines adjacent to the tile
    }
  
    setMine() {
      this.mine = true;
    }
  
    reveal() {
      this.revealed = true;
    }
  
    toggleFlag() {
      this.flagged = !this.flagged;
    } 
  } 
  

  // may or may not be used - several other ways to do tile arrays.
function create2DArray(rows, cols) 
{
    const arr = new Array(rows); // creates an array of rows
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols); // create each row array with the number of columns
      for (let j = 0; j < cols; j++) {
        arr[i][j] = new Tile(); // assign a new Tile object to each column index
        console.log("Row =" + i + " Col = " + j)
      }
    }
    return arr;
}

