class Tile {
  constructor() {
    this.domElement = document.createElement('div');
    this.domElement.classList.add('cell');
    this.mine = false;    // does the tile have a mine?
    this.revealed = false; // is the tile revealed?
    this.flagged = false;  // is the tile flagged?
    this.adjacentMines = 0; // number of mines adjacent to the tile
    this.wasLongPress = false; // to track if the touch was a long press for flagging
  }
  
  // method to set mine
  setMine() {
    this.mine = true;
  }

  setAdjacentMines(count) {
    this.adjacentMines = count;
  }  
  
  // method to mark as revealed
  reveal(tileArray, row, col) {
    if (this.revealed || gameOver || this.flagged) return;

    this.revealed = true;
    this.domElement.classList.add('revealed');

    // First-click logic
    if (firstClick) {
        startTimer(); // Start the timer
        bombSpots = generateMinesAfterFirstClick(row, col, tileArray.length, tileArray[0].length);
        populateMines(tileArray, bombSpots);
        checkNeighborMines(tileArray); // Set adjacent mine counts
        firstClick = false; // Disable first-click flag
    }

    // Reveal logic
    if (this.mine) {
        this.domElement.classList.add('bomb');
        this.domElement.textContent = '💣';
        hitMine(); // Trigger game-over logic
    } else if (this.adjacentMines === 0) {
        this.domElement.textContent = '';
        this.revealAdjacentEmpty(tileArray, row, col); // Recursive reveal
        //check to see if game is won when revealing this tile
        this.gameWinCheck();
    } else {
        this.domElement.textContent = this.adjacentMines.toString();
        //check to see if game is won when revealing this tile
        this.gameWinCheck();
    }
}

  // method to check if the game has been won
  gameWinCheck() {
    // assumes board is 10x10 and 10 mines (difficulty 1)
    if (revealedTilesForWin == 89) // win condition - 1, because last click will cause the win
    {
        //game over logic here to stop game and timer
        gameOver = true;
        timerStarted = false;
        // timer stop
        clearInterval(timeInterval); 
        //score = document.getElementById('timer').textContent; //will be sent with username for leaderboard
        console.log("Game Over, you win! " + document.getElementById('timer').textContent);
    }
    else
    {
        revealedTilesForWin++;
        console.log("Currently revealed tiles count: " + revealedTilesForWin);
    }
  }

  // method to mark as flagged
  toggleFlag() {
    if (this.revealed) return; // Don't allow flagging a revealed tile
    this.flagged = !this.flagged;

    if (this.flagged) {
      this.domElement.classList.add('flagged');
      this.domElement.textContent = '🚩'; // Show a flag emoji
    } else {
      this.domElement.classList.remove('flagged');
      this.domElement.textContent = ''; // Remove the flag emoji
    }
  }
  revealAdjacentEmpty(tileArray, row, col) {
    // Directions for adjacent tiles (including diagonals)
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
  
      if (
          newRow >= 0 && newRow < tileArray.length &&
          newCol >= 0 && newCol < tileArray[0].length
      ) {
          const neighbor = tileArray[newRow][newCol];
          if (!neighbor.revealed && !neighbor.mine) {
              neighbor.reveal(tileArray, newRow, newCol);
          }
      }
  });
}
}

// Function to create 2D array of tiles and plant bombs
function create2DArray(rows, cols, bombSpots) {
  const arr = new Array(rows); // Create an array of rows

  console.log(`Creating a 2D array with ${rows} rows and ${cols} columns.`); // Log the dimensions

  for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols); // Create each row array with the number of columns

      for (let j = 0; j < cols; j++) {
          const tile = new Tile(); // Create a new Tile object
          arr[i][j] = tile;

          // Check if the tile's index matches a bomb spot
          const index = i * cols + j;
          if (bombSpots.includes(index)) {
              tile.setMine(); // Set the tile as a mine
          }

          // Link the DOM element to the Tile object for future reference
          tile.domElement.__tileObj = tile;

          // Add event listeners for revealing and flagging
          tile.domElement.addEventListener('click', function () {
              if (!gameOver) {
                  tile.reveal(arr, i, j); // Reveal the tile
              }
          });

          tile.domElement.addEventListener('contextmenu', function (e) {
              e.preventDefault(); // Prevent the default context menu
              if (!gameOver) {
                  tile.toggleFlag(); // Toggle flag
              }
          });

          // Add touch events for mobile (press and hold to flag)
          let touchStartTimer;
          tile.domElement.addEventListener('touchstart', function () {
              tile.wasLongPress = false; // Reset long press tracker
              touchStartTimer = setTimeout(() => {
                  if (!tile.revealed) {
                      tile.toggleFlag(); // Flag on long press
                      tile.wasLongPress = true; // Mark as long press
                  }
              }, 500); // 500ms for long press
          });

          tile.domElement.addEventListener('touchend', function () {
              clearTimeout(touchStartTimer); // Clear the timer on touch end
              if (!tile.wasLongPress && !tile.flagged && !gameOver) {
                  tile.reveal(arr, i, j); // Reveal tile if it wasn't flagged
              }
          });

          tile.domElement.addEventListener('touchcancel', function () {
              clearTimeout(touchStartTimer); // Clear the timer if the touch is canceled
          });
      }
  }

  return arr;
}

function checkNeighborMines(tileArray) {
  for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
          if (!tileArray[row][col].mine) {
              let mineCount = 0;
              const directions = [
                  [-1, -1], [-1, 0], [-1, 1],
                  [0, -1],          [0, 1],
                  [1, -1], [1, 0], [1, 1],
              ];

              directions.forEach(([dx, dy]) => {
                  const newRow = row + dx;
                  const newCol = col + dy;
                  if (
                      newRow >= 0 && newRow < gridRows &&
                      newCol >= 0 && newCol < gridCols &&
                      tileArray[newRow][newCol].mine
                  ) {
                      mineCount++;
                  }
              });

              tileArray[row][col].setAdjacentMines(mineCount);
          }
      }
  }
}



// Export Tile and create2DArray
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Tile, create2DArray };
}
