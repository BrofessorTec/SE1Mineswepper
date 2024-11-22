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
  
  // method to mark as revealed
  reveal() {
    if (this.revealed || gameOver || this.flagged) return;

    this.revealed = true;
    this.domElement.classList.add('revealed'); // Changes the tile color when it is clicked on by adding the css class 'revealed'
    if (this.mine) {
      this.domElement.classList.add('bomb'); // Apply the 'bomb' class for red background
      this.domElement.textContent = '💣'; // Show a bomb if it's a mine
      hitMine(); //If a mine gets revealed, call the hitMine() function
      //game over logic when implemented
    } else if (this.adjacentMines == 0) {
      this.domElement.textContent = '0'; // we could also choose not to display 0s
      // reveal other empty spaces logic when implemented
    } else {
      this.domElement.textContent = this.adjacentMines.toString(); //displays the # of neighboring mines when implemented
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
}

// Function to create 2D array of tiles and plant bombs
function create2DArray(rows, cols, bombSpots) {
  const arr = new Array(rows); // creates an array of rows
  console.log(`Creating a 2D array with ${rows} rows and ${cols} columns.`); // log dimensions
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols); // create each row array with the number of columns
    for (let j = 0; j < cols; j++) {
      arr[i][j] = new Tile(); // assign a new Tile object to each column index
      if (bombSpots.includes((i + 1) + (j * 10))) {
        arr[i][j].setMine(); // Sets Mines at the spots generated in Mineswepper.js
      }
      arr[i][j].domElement.__tileObj = arr[i][j]; // Link the DOM element to the Tile object

      // Left-click event to reveal the tile
      arr[i][j].domElement.addEventListener('click', function () {
        if (!gameOver) {
          arr[i][j].reveal();
          // if the tile revealed is a mine, run the hitMine() function
          if (arr[i][j].mine) {
            hitMine();
          }
        }
      });

      // Right-click event to flag the tile
      arr[i][j].domElement.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent the default context menu
        arr[i][j].toggleFlag(); // Toggle the flag
      });

      // Touch events for mobile (press and hold to flag)
      let touchStartTimer;
      arr[i][j].domElement.addEventListener('touchstart', function () {
        arr[i][j].wasLongPress = false; // Reset long press tracker
        touchStartTimer = setTimeout(() => {
          arr[i][j].toggleFlag(); // Flag after a long press
          arr[i][j].wasLongPress = true; // Set long press tracker
        }, 500); // 500ms for long press
      });

      arr[i][j].domElement.addEventListener('touchend', function () {
        clearTimeout(touchStartTimer); // Clear the timer on touch end
        // Only reveal if the touch was not a long press for flagging
        if (!arr[i][j].flagged && !arr[i][j].wasLongPress) {
          arr[i][j].reveal();
        }
      });

      arr[i][j].domElement.addEventListener('touchcancel', function () {
        clearTimeout(touchStartTimer); // Clear the timer if the touch is cancelled
      });
    }
  }
  return arr;
}

// Export Tile and create2DArray
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Tile, create2DArray };
}
