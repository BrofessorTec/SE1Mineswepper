// Import the Tile class so we can test its functionality.
const { Tile } = require('../../Tile.js');
console.log(Tile); // Making sure the Tile class is being imported.

// Accounting for global game state
global.gameOver = false;

global.hitMine = () => {
  // Empty hitMine function mock to prevent Tile class from throwing error.
};

// Mock the `document` because these tests need a virtual DOM environment ==> we aren't currently using a testing framework so this is done manually.
global.document = {
  createElement: (tagName) => {
    return {
      tagName: tagName.toUpperCase(),
      classList: {
        classes: [],
        add: function (className) {
          this.classes.push(className); // Simulates adding CSS classes to the element.
        },
        // Adding 'remove' to classList so toggle flag can be properly removed
        // e.g. this.domElement.classList.remove('flagged')
        remove: function (className) {
          this.classes = this.classes.filter(c => c !== className);
        },
        contains: function (className) {
          return this.classes.includes(className); // Checks if a class is already present.
        },
      },
      textContent: '', // Holds the text content of the element, as in would in real DOM.
      addEventListener: function () {}, // Simulates adding event listeners, though they won't fire here.
    };
  },
};

// Helper function to run a test and log its success (or failure...)
function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log(`✔ ${testName} passed successfully.`);
  } catch (error) {
    console.error(`✘ ${testName} failed:`, error.message);
  }
}

// Tests for Tile.js
// These tests ensure the behavior of individual tiles is consistent/correct/predictable.

function testTileInitialization() {

  // ARRANGE
  const tile = new Tile();

  // No "act" necessary 

  // ASSERT
  // Verify the tile starts in a neutral state. This prevents unintended behavior
  // in the early game and ensures flags, mines, and reveals are applied correctly later.
  console.assert(tile.mine === false, "Tile should start without a mine to avoid accidental explosions.");
  console.assert(tile.revealed === false, "Tile should be unrevealed initially to maintain game suspense.");
  console.assert(tile.flagged === false, "Tile should not be flagged at the start, as flags are a player action.");
  console.assert(tile.adjacentMines === 0, "Tile should start with 0 adjacent mines for proper setup.");
}

function testSetMine() {

  // ARRANGE
  const tile = new Tile();

  // ACT
  tile.setMine();

  // ASSERT
  // Here we make sure `setMine` marks a tile as containing a bomb is important for correct game logic,
  // especially when checking win/lose conditions.
  console.assert(tile.mine === true, "setMine() must mark the tile as containing a mine.");
}

function testRevealMine() {
  
  // ARRANGE
  const tile = new Tile();

  // ACT
  tile.setMine();
  tile.reveal();

  // ASSERT
  // Revealing a tile that contains a mine should display correctly
  // and mark the tile as revealed to avoid duplicate actions.
  console.assert(tile.revealed === true, "Revealing a tile should mark it as revealed.");
  console.assert(tile.domElement.classList.contains('bomb'), "Revealing a mine should add the 'bomb' class for visuals.");
  console.assert(tile.domElement.textContent === '💣', "Revealing a mine should display a bomb icon for clarity.");
}

function testRevealEmpty() {

  // ARRANGE
  const tile = new Tile();

  // ACT
  tile.adjacentMines = 0;
  tile.reveal();

  // ASSERT
  // When a tile has no adjacent mines, the game must make this clear
  // to prevent confusion and guide further play.
  console.assert(tile.revealed === true, "Revealing a tile should mark it as revealed.");
  console.assert(tile.domElement.textContent === '', "Empty tiles should display no text."); // Updated to match implementation (subject to change)
}

function testToggleFlag() {

  // ARRANGE
  const tile = new Tile();

  // ACT
  // Flags are a critical player tool for marking suspected mines.
  // Here we are making sure the flags mark correctly.
  tile.toggleFlag();

  // ASSERT
  console.assert(tile.flagged === true, "toggleFlag() should flag the tile to help the player mark potential mines.");
  tile.toggleFlag();
  console.assert(tile.flagged === false, "toggleFlag() should unflag the tile to allow corrections.");
}

// Run all tests for the Tile class
console.log("Running Tile Tests...");
runTest("Tile Initialization", testTileInitialization);
runTest("Set Mine", testSetMine);
runTest("Reveal Mine", testRevealMine);
runTest("Reveal Empty", testRevealEmpty);
runTest("Toggle Flag", testToggleFlag);
console.log("Tile Tests Completed.");


//    RUNNING THIS TEST:
// 1) Open terminal and navigate to the directory this file is located in
// 2) enter `node ./Tile.test.js`


