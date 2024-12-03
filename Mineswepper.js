// Select elements
const gameBoard = document.getElementById('game-board');

// Game settings
const gridRows = 10; // 10x10 grid
const gridCols = 10;
let difficulty = 1; 
let timeElapsed = 0; // Tracks elapsed time
let timeInterval = null; // Reference for the timer interval
let timerStarted = false; //Tracks if the timer has been started
let totalFlags = 0; // Track the total number of flags
const totalMines = 10 * difficulty; // Adjust for difficulty if needed


let firstClick = true; // Track if it's the first click
let bombSpots = []; // Global bomb locations
let gameOver = false; // Track if the game is over

//Function to update the timer
//Sets minutes and seconds and elapses time
//Sets the string for timer and pads the seconds (so that seconds is always 2 digits)
function updateTimer() {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60); // Calculate minutes
    const seconds = timeElapsed % 60; // Calculate seconds
    document.getElementById('timer').textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Stops at 9:59 (599 seconds)
    if (timeElapsed >= 599) { 
        clearInterval(timeInterval);
    }
}

//Function to start the timer by setting the interval to 1000 (1 second)
function startTimer() {
    timeElapsed = 0;
    if (!timerStarted) {
        timerStarted = true;
        timeInterval = setInterval(updateTimer, 1000); // Calls `updateTimer` every second
    }
    
}

// Function to update the flag count display
function updateFlagCount() {
    document.getElementById('flag-count').textContent = `Flags: ${totalFlags}`;
}

// Function to initialize the game grid
function initializeGame() {
    gameBoard.innerHTML = ''; // Clear the game board
    firstClick = true; // Reset first-click flag
    gameOver = false; // Reset game-over flag
    totalFlags = 0; // Reset flags
    updateFlagCount();
    if (timeInterval) clearInterval(timeInterval); // Clear any existing interval
    document.getElementById('timer').textContent = 'Time: 0:00'; // Reset timer display
    timerStarted = false; 

    // Set the grid template for the CSS grid layout
    gameBoard.style.gridTemplateColumns = `repeat(${gridCols}, 39px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridRows}, 39px)`;

    // Initialize the game grid without mines
    const tileArray = createEmptyGrid(gridRows, gridCols);

    tileArray.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            gameBoard.appendChild(tile.domElement);

            tile.domElement.addEventListener('click', () => {
                if (gameOver) return;

                if (firstClick) {
                    startTimer(); //Starts timer on the first click
                    // Generate mines avoiding the first clicked tile
                    bombSpots = generateMinesAfterFirstClick(rowIndex, colIndex, gridRows, gridCols);
                    populateMines(tileArray, bombSpots);
                    checkNeighborMines(tileArray);
                    firstClick = false;
                }

                // Reveal the clicked tile
                tile.reveal(tileArray, rowIndex, colIndex);
            });
        });
    });
}

// Create an empty grid with no mines
function createEmptyGrid(rows, cols) {
    return create2DArray(rows, cols, []); // Utilize the `create2DArray` function from Tile.js
}

// Generate mines, avoiding the first clicked tile and its neighbors
function generateMinesAfterFirstClick(row, col, rows, cols) {
    const excludedTiles = getExcludedTiles(row, col, rows, cols);
    const bombSpots = [];
    const totalCells = rows * cols;
    const bombCount = 10 * difficulty; // Adjust for difficulty if needed

    while (bombSpots.length < bombCount) {
        const bombLocation = Math.floor(Math.random() * totalCells);
        if (!excludedTiles.includes(bombLocation) && !bombSpots.includes(bombLocation)) {
            bombSpots.push(bombLocation);
        }
    }

    return bombSpots;
}


// Get tiles to exclude from bomb placement (clicked tile and neighbors)
function getExcludedTiles(row, col, rows, cols) {
    const excluded = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                excluded.push(newRow * cols + newCol);
            }
        }
    }
    return excluded;
}


// Populate the grid with mines based on bombSpots
function populateMines(tileArray, bombSpots) {
    bombSpots.forEach((bombIndex) => {
        const row = Math.floor(bombIndex / gridCols);
        const col = bombIndex % gridCols;
        tileArray[row][col].setMine();
    });
}


// End the game when revealing a mine tile
function hitMine() {
    gameOver = true;
    timerStarted = false;
    clearInterval(timeInterval); //Stops timer when bomb is hit
    console.log("Game Over triggered!");

    // Reveal all bombs
    const tiles = document.querySelectorAll('.cell');
    tiles.forEach((tile) => {
        const tileObj = tile.__tileObj; // Retrieve the tile
        if (tileObj && tileObj.mine) {
            tile.textContent = '💣'; // Show the bomb icon
            tile.classList.add('bomb', 'revealed'); // Apply the bomb and revealed styles
        }
        tile.style.pointerEvents = 'none'; // Disable further clicks on all tiles
    });
}

// Restart game functionality
function restartGame() {
    console.log("Game restarted");
    initializeGame();
}

// Add restart button functionality
document.getElementById("restart-button").addEventListener("click", restartGame);

// Initialize the game grid on page load
initializeGame();

// Export for tests but ignore `module` in dev tools where it's dependent on Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateMinesAfterFirstClick, initializeGame, restartGame };
}
