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

  // create the grid cells in the DOM using nested for loops 
  for (let row = 0; row < gridRows; row++) 
  {
    for (let col = 0; col < gridCols; col++) 
    {
      const cell = document.createElement('div');
      cell.classList.add('cell');  // add the CSS class for styling
      cell.dataset.row = row;
      console.log(row); // testing log statement can be removed 
      cell.dataset.col = col;
      console.log(col); // testing log statement can be removed 
      cell.revealed = false; //using this variable so that cells cannot be clicked multiple times

      // Add event listener for each cell to detect mouse click interaction
      cell.addEventListener('click', () => {
        // Adds correct symbol based on game rules
        if (!cell.revealed)
        {
          const randomNum = Math.floor(Math.random() * 10); //to be replaced later with game logic
          if (randomNum < 9)
          {
            cell.textContent = randomNum; //to be replaced later with game logic
          }
          else
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





