
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
      if (this.flagged) return;
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
        this.domElement.textContent = this.adjacentMines; // we could also choose not to display 0s
        // reveal other empty spaces logic when implemented
      }
      else
      {
        this.domElement.textContent = this.adjacentMines; //displays the # of neighboring mines when implemented
      }
    }
    //method to mark as flagged
    toggleFlag() 
    {
      if (this.revealed) return; // don't allow flagging if the tile is revealed
      this.flagged = !this.flagged;
      if (this.flagged) 
      {
        this.domElement.classList.add('flagged');
        this.domElement.textContent = '🚩'; // show a flag emoji
      } 
      else 
      {
        this.domElement.classList.remove('flagged');
        this.domElement.textContent = ''; // remove the flag emoji
      }
    }

  } 
  

// function to create 2D array of Tile objects and plant bombs. Also Responds to flags (right click)
function create2DArray(rows, cols, bombSpots) 
{
    const arr = new Array(rows); // creates an array of rows
    console.log(`Creating a 2D array with ${rows} rows and ${cols} columns.`); // log dimensions
    for (let i = 0; i < rows; i++) 
    {
      arr[i] = new Array(cols); // create each row array with the number of columns
      console.log(`Creating row ${i} with ${cols} columns.`); //logging statement
      for (let j = 0; j < cols; j++) 
      {
        arr[i][j] = new Tile(); // assign a new Tile object to each column index
        if (bombSpots.includes((i+1)+(j*10)))
        {
          arr[i][j].setMine(); // Sets Mines at the spots generated in Mineswepper.js
        }
        arr[i][j].domElement.addEventListener('click', function () {
          arr[i][j].reveal(); //reveals the Tile if clicked
      });

       // Right-click event to flag the tile
       arr[i][j].domElement.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // prevent the default context menu
        arr[i][j].toggleFlag(); // toggle the flag
      });

          // Touch events for mobile (press and hold to flag)
          let touchStartTimer;
          let delayTime; // Delay for preventing immediate reveal after unflagging
          
          arr[i][j].domElement.addEventListener('touchstart', function (e) {
            // Start the long press timer for flagging
            touchStartTimer = setTimeout(() => {
              arr[i][j].toggleFlag(); // Flag after a long press
              delayTime = Date.now();  // Record the time when flagging/unflagging happens
            }, 500); // 500ms for long press
          });
          
          arr[i][j].domElement.addEventListener('touchend', function () {
            clearTimeout(touchStartTimer); // Clear the timer on touch end
          
            // Adding a delay of 300ms to prevent immediate revealing after unflagging
            const now = Date.now();
            if (!arr[i][j].flagged && now - delayTime > 300) {
              arr[i][j].reveal(); // Reveal only after the delay has passed
            }
          });
          
          arr[i][j].domElement.addEventListener('touchcancel', function () {
            clearTimeout(touchStartTimer); // Clear the timer if the touch is cancelled
          });

       // console.log(`Row = ${i}, Col = ${j}: Tile object created.`);  //logging statement
      }
    }
    return arr;
}

