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

  difficulty = 1; // 1 is normal, could do 2 is higher etc.. just testing something here
  let bombSpots = []; //create array of bomb locations

  bombSpots = generateMines(difficulty, gridRows, gridCols);

  //testing new cell array code here
  create2DArray(gridRows, gridCols).forEach((row) => {
    row.forEach((tile) => {
        //const cell = document.createElement('div');
        //cell.classList.add('cell');  // Adds cell css
        
        gameBoard.appendChild(tile.domElement);
    });
  });


  // create the grid cells in the DOM using nested for loops 
  /*for (let row = 0; row < gridRows; row++) 
  {
    for (let col = 0; col < gridCols; col++) 
    {
      const cell = document.createElement('div');
      cell.classList.add('cell');  // add the CSS class for styling
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.revealed = false; //using this variable so that cells cannot be clicked multiple times

      // Add event listener for each cell to detect mouse click interaction
      cell.addEventListener('click', () => {
        // Adds correct symbol based on game rules
        if (!cell.revealed)
        {
          currentLocation = (row+1)+(col*10);
          console.log("Current location is " + currentLocation); // cells were generated per column

          if (bombSpots.includes(currentLocation)) //new bomb placement logic
          {
            cell.textContent = "💣"
            cell.classList.add('bomb'); // Apply the 'bomb' class for red background
          }
          else
          {
            const randomNum = Math.floor(Math.random() * 9); //to be replaced later with game logic
            cell.textContent = randomNum; //to be replaced later with game logic
          }

          cell.style.textAlign = 'center'; // Center the text
          cell.style.fontSize = '24px'; // Adjust font size
          cell.style.lineHeight = '39px'; // Match the cell height
          cell.classList.add('revealed'); // Changes the tile color when it is clicked on by adding the css class 'revealed'
          cell.revealed = true;
        }
      });


      
      gameBoard.appendChild(cell);
    }
    
  }
 */

}
// Function to restart the game
function restartGame() {
  // Clear and reinitialize the game board
  console.log("Game restarted");
  initializeGame();
}

function generateMines(difficulty, gridRows, gridCols) {
  let bombSpots = []; //create array of bomb locations
  if (difficulty == 1) 
    {
      //generate 10 bomb locations, can be updated later with different difficulties
      bombsCount = 10;
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
    }
    return bombSpots;
}

// Add this restart functionality to the "Restart Game" button
document.getElementById("restart-button").addEventListener("click", restartGame);

// call initializegame to create the grid
initializeGame();





