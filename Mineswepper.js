// select elements
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

// game default settings
const gridRows = 10; // 10x10 grid
const gridCols = 10;
const numMines = 10;
let grid = [];
let gameOver = false;

// function to create a 2D array with variables for each obj
function create2DArray(rows, cols) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols).fill().map(() => ({ mine: false, revealed: false, flagged: false }));
  }
  return arr;
}

// creates game baord currently 
function initializeGame() {
  gameOver = false;
  grid = create2DArray(gridRows, gridCols);
  gameBoard.innerHTML = '';
 

  // create the grid cells in the DOM.. 
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      console.log(row, col);
      gameBoard.appendChild(cell);
    }
  }
  gameBoard.style.gridTemplateColumns = `repeat(${gridCols}, 40px)`;

  console.log("Grid Created.")
}

create2DArray(gridRows, gridCols);
initializeGame();


// Place mines randomly
let minesPlaced = 0;
while (minesPlaced < numMines) {
  const row = Math.floor(Math.random() * gridRows);
  const col = Math.floor(Math.random() * gridCols);
  if (!grid[row][col].mine) {
    grid[row][col].mine = true;
    minesPlaced++;
  }
}
