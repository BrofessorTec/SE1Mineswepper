// Import the Tile class so we can test its functionality.
const { Tile } = require('../../Tile.js');
console.log(Tile); // Making sure the Tile class is being imported.

// Mock the `document` because these tests need a virtual DOM environment (because we aren't currently using a testing framework).
global.document = {
  createElement: (tagName) => {
    return {
      tagName: tagName.toUpperCase(),
      classList: {
        classes: [],
        add: function (className) {
          this.classes.push(className); // Simulates adding CSS classes to the element.
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
  const tile = new Tile();

  // Verify the tile starts in a neutral state. This prevents unintended behavior
  // in the early game and ensures flags, mines, and reveals are applied correctly later.
  console.assert(tile.mine === false, "Tile should start without a mine to avoid accidental explosions.");
  console.assert(tile.revealed === false, "Tile should be unrevealed initially to maintain game suspense.");
  console.assert(tile.flagged === false, "Tile should not be flagged at the start, as flags are a player action.");
  console.assert(tile.adjacentMines === 0, "Tile should start with 0 adjacent mines for proper setup.");
}

function testSetMine() {
  const tile = new Tile();
  tile.setMine();

  // Here we make sure `setMine` marks a tile as containing a bomb is important for correct game logic,
  // especially when checking win/lose conditions.
  console.assert(tile.mine === true, "setMine() must mark the tile as containing a mine.");
}

function testRevealMine() {
  const tile = new Tile();
  tile.setMine();
  tile.reveal();

  // Revealing a tile that contains a mine should display correctly
  // and mark the tile as revealed to avoid duplicate actions.
  console.assert(tile.revealed === true, "Revealing a tile should mark it as revealed.");
  console.assert(tile.domElement.classList.contains('bomb'), "Revealing a mine should add the 'bomb' class for visuals.");
  console.assert(tile.domElement.textContent === '💣', "Revealing a mine should display a bomb icon for clarity.");
}

function testRevealEmpty() {
  const tile = new Tile();
  tile.adjacentMines = 0;
  tile.reveal();

  // When a tile has no adjacent mines, the game must make this clear
  // to prevent confusion and guide further play.
  console.assert(tile.domElement.textContent === '0', "Tiles with no adjacent mines should display '0' for clarity.");
}

function testToggleFlag() {
  const tile = new Tile();

  // Flags are a critical player tool for marking suspected mines.
  // Here we are making sure the flags mark correctly.
  tile.toggleFlag();
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

