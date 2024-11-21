
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
        this.domElement.textContent = '0'; // we could also choose not to display 0s
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
function create2DArray(rows, cols, bombSpots) 
{
    const arr = new Array(rows); // creates an array of rows
    console.log(`Creating a 2D array with ${rows} rows and ${cols} columns.`); // log dimensions
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols); // create each row array with the number of columns
      //console.log(`Creating row ${i} with ${cols} columns.`); //logging statement
      for (let j = 0; j < cols; j++) {
        arr[i][j] = new Tile(); // assign a new Tile object to each column index
        if (bombSpots.includes((i+1)+(j*10)))
        {
          arr[i][j].setMine(); // Sets Mines at the spots generated in Mineswepper.js
        }
        arr[i][j].domElement.addEventListener('click', function () {
          //checks neighboring mines each time a tile is interacted with
          checkNeighborMines(arr, i, j);
          arr[i][j].reveal(); //reveals the Tile if clicked
      });
        //console.log(`Row = ${i}, Col = ${j}: Tile object created.`);  //logging statement
      }
    }
    return arr;
}

function checkNeighborMines(arr, xPos, yPos)
{
  console.log("Currently checking location: " + xPos + ", " + yPos);
  if (!arr[xPos][yPos].mine) //if not a mine
  {
      if (xPos-1 >= 0 && arr[xPos-1][yPos].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (xPos-1 >= 0 && yPos-1 >= 0 && arr[xPos-1][yPos-1].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (xPos-1 >= 0 && yPos+1 <= 9 && arr[xPos-1][yPos+1].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (yPos+1 <= 9 && arr[xPos][yPos+1].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (xPos+1 <= 9 && yPos+1 <= 9 && arr[xPos+1][yPos+1].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (xPos+1 <= 9 && arr[xPos+1][yPos].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (xPos+1 <= 9 && yPos-1 >= 0 && arr[xPos+1][yPos-1].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
        if (yPos-1 >= 0 && arr[xPos][yPos-1].mine)
        {
          arr[xPos][yPos].setAdjacentMines(arr[xPos][yPos].adjacentMines + 1);
        }
  }
}


// Export Tile and create2DArray
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Tile, create2DArray };
}
