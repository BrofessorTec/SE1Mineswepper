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
  bombsCount = 10; // 10 default number of bombs for normal difficulty
  let bombSpots = []; //create array of bomb locations

  if (difficulty == 1) 
    {
      //generate 10 bomb locations
      bombsCount = 10;
      for (let bombPlanted = 0; bombPlanted < bombsCount; bombPlanted++)
        {
          gridMax = gridCols * gridRows;
          const bombLocation = Math.floor((Math.random() * gridMax) + 1); //cell 1 and 100 test cases passed
          bombSpots.push(bombLocation);
          console.log("Bomb placed at " + bombLocation);
        } 
    }


  // create the grid cells in the DOM using nested for loops 
  for (let row = 0; row < gridRows; row++) 
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
          console.log("Current location is " + ((row+1)+(col*10))); // cells were generated per column

          const randomNum = Math.floor(Math.random() * 10); //to be replaced later with game logic
          if (randomNum < 9)
          {
            cell.textContent = randomNum; //to be replaced later with game logic
          }

          if (bombSpots.includes((row+1)+(col*10))) //new bomb placement logic
          {
            cell.textContent = "💣"
          }

          cell.style.textAlign = 'center'; // Center the text
          cell.style.fontSize = '24px'; // Adjust font size
          cell.style.lineHeight = '39px'; // Match the cell height
          cell.revealed = true;
        }
      });


      
      gameBoard.appendChild(cell);
    }
    
  }

}

// call initializegame to create the grid
initializeGame();





