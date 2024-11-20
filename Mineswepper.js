// select elements
const gameBoard = document.getElementById('game-board');

// game settings
const gridRows = 10; // 10x10 grid
const gridCols = 10;

// function to initialize the game grid (just printing the grid)
function initializeGame() 
{
  gameBoard.innerHTML = '';  // clear the game board

  // set the grid template for the CSS grid layout - can be altered later if needed for dynamic game board size
  gameBoard.style.gridTemplateColumns = `repeat(${gridCols}, 39px)`; 
  gameBoard.style.gridTemplateRows = `repeat(${gridRows}, 39px)`;

  difficulty = 1; // 1 is normal and equals 10% bombs as of now. 2 is 20% etc. This is used in generateMines()

  //Generates Mines in unique locations based on difficulty
  //This is used when generating Tiles to know if they have a Mine or not
  //Will need to alter some logic later for the First Click interaction..
  let bombSpots = []; //create an empty array of bomb locations
  bombSpots = generateMines(difficulty, gridRows, gridCols); 

  //generates Tiles and populates Game Board
  create2DArray(gridRows, gridCols, bombSpots).forEach((row) => {
    row.forEach((tile) => {
        gameBoard.appendChild(tile.domElement);
    });
  });

}
// Function to restart the game
function restartGame() {
  // Clear and reinitialize the game board
  console.log("Game restarted");
  initializeGame();
}

function generateMines(difficulty, gridRows, gridCols) {
  let bombSpots = []; //create array of bomb locations
      //generate 10 x difficulty bomb locations
      bombsCount = 10 * difficulty;
      for (let bombPlanted = 0; bombPlanted < bombsCount; bombPlanted++)
        {
          gridMax = gridCols * gridRows;
          bombLocation = Math.floor((Math.random() * gridMax) + 1); //cell 1 and 100 test cases passed
          while (bombSpots.includes(bombLocation))
          {
            //generate another location if there is already a bomb in this spot
            bombLocation = Math.floor((Math.random() * gridMax) + 1); //cell 1 and 100 test cases passed
          }
          bombSpots.push(bombLocation);
          console.log("Bomb placed at " + bombLocation);
        } 
    return bombSpots;
}

// Add this restart functionality to the "Restart Game" button
document.getElementById("restart-button").addEventListener("click", restartGame);

// call initializegame to create the grid
initializeGame();





