
class Tile {
    constructor() {
      this.domElement = document.createElement('div');
      this.domElement.classList.add('cell');
      this.mine = false;    // does the tile have a mine?
      this.revealed = false; // is the tile revealed?
      this.flagged = false;  // is the tile flagged?
      this.adjacentMines = 0; // number of mines adjacent to the tile
    }
    // method to set mine
    setMine() 
    {
      this.mine = true;
    }
    // method to mark as revealed
    reveal() 
    {
      //if not flagged (when this is implemented)
      this.revealed = true;
      this.domElement.classList.add('revealed'); // Changes the tile color when it is clicked on by adding the css class 'revealed'
      if (this.mine)
      {
        this.domElement.classList.add('bomb'); // Apply the 'bomb' class for red background
        this.domElement.textContent = '💣'; // Show a bomb if it's a mine
        //game over logic when implemented
      }
      else if (this.adjacentMines == 0)
      {
        this.domElement.textContent = ''; // we could also choose not to display 0s
        // reveal other empty spaces logic when implemented
      }
      else
      {
        //check neighboring cells based on current location
        this.domElement.textContent = this.adjacentMines.toString(); //displays the # of neighboring mines when implemented
      }
    }
    //method to mark as flagged
    toggleFlag() 
    {
      this.flagged = !this.flagged;
    } 
    //method to adjust field for the correct number of adjacent mines
    setAdjacentMines(neighboringMines)
    {
      this.adjacentMines = neighboringMines;
    }
  } 
  

  // may or may not be used - several other ways to do tile arrays.
  function create2DArray(rows, cols, bombSpots) {
    const arr = new Array(rows); // creates an array of rows
    console.log(`Creating a 2D array with ${rows} rows and ${cols} columns.`); // log dimensions
  
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols); // create each row array with the number of columns
  
      for (let j = 0; j < cols; j++) {
        arr[i][j] = new Tile(); // assign a new Tile object to each column index
  
        // Reset the DOM element to ensure no duplicate listeners
        arr[i][j].domElement.replaceWith(arr[i][j].domElement.cloneNode(true)); // Remove old listeners
        arr[i][j].domElement = arr[i][j].domElement.cloneNode(true); // Replace with clone
  
        // Add the event listener
        arr[i][j].domElement.addEventListener('click', function () {
          checkNeighborMines(arr, i, j); // Check neighboring mines
          arr[i][j].reveal(); // Reveal the tile
        });
      }
    }
    return arr;
  }

  function checkNeighborMines(arr, xPos, yPos) {
    if (arr[xPos][yPos].checked) return; // Skip already-checked tiles
  
    console.log("Currently checking location: " + xPos + ", " + yPos);
  
    arr[xPos][yPos].checked = true; // Mark the tile as checked

  if (!arr[xPos][yPos].mine && arr[xPos][yPos].adjacentMines === 0) { // Only calculate if not a mine and not calculated yet
    let mineCount = 0;

    // Directions: top-left, top, top-right, right, bottom-right, bottom, bottom-left, left
    const directions = [
      [-1, 0], [-1, -1], [-1, 1], [0, 1],
      [1, 1], [1, 0], [1, -1], [0, -1],
    ];

    for (const [dx, dy] of directions) {
      const newX = xPos + dx;
      const newY = yPos + dy;

      if (newX >= 0 && newX < arr.length && newY >= 0 && newY < arr[0].length) {
        if (arr[newX][newY].mine) {
          mineCount++;
        }
      }
    }

    arr[xPos][yPos].setAdjacentMines(mineCount); // Set adjacent mines count
  }
}


// Export Tile and create2DArray
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Tile, create2DArray };
}
