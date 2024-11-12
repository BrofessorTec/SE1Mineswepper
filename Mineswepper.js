// select elements
const gameBoard = document.getElementById('game-board');

// game settings
const gridRows = 10; // 10x10 grid
const gridCols = 10;

/*
// function to create a 2D array of objects/elements that can populate the cells. 
function create2DArray(rows, cols) 
{
  const arr = [];
  
  // outer loop for rows
  for (let i = 0; i < rows; i++) {
    arr[i] = []; // initialize an empty array for each row
    console.log("i = " + i);
    // Inner loop for columns
    for (let j = 0; j < cols; j++) {
      console.log("j = " + j); // added to see exact logic in console
      arr[i][j] = {
        mine: false,      // the cell does not contain a bomb initially
        revealed: false,  // the cell has not been revealed
        flagged: false,   // the cell has not been flagged
        adjacentMines: 0  // no adjacent mines initially
      };
    }
  }
  
  return arr;  // return the 2D array
}
*/

// function to initialize the game grid (just printing the grid)
function initializeGame() 
{
  gameBoard.innerHTML = '';  // clear the game board

  // set the grid template for the CSS grid layout
  gameBoard.style.gridTemplateColumns = `repeat(${gridCols}, 40px)`;

  // create the grid cells in the DOM
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');  // add the CSS class for styling
      cell.dataset.row = row;
      cell.dataset.col = col;
      gameBoard.appendChild(cell);
    }
  }
}

// call initializeGame to create the grid
initializeGame();
create2DArray(gridCols, gridRows);


