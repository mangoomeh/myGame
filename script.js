// Create player and tile classes
class Player {
  constructor(id) {
    this.id = id;
  }

  position = 0; // zero indexing
  ownedDeeds = [];
  money = 1000;
  node = null;

  move(steps) {
    this.position += steps;
    this.position %= 40;
  }

  buyDeed(tile) {
    this.money -= tile.getPrice();
    this.ownedDeeds.push(tile);
    tile.setOwner(this);
  }

  pay(player, amount) {
    this.money -= amount;
    player.money += amount;
  }

  getPosition() {
    return this.position;
  }

  setNode(node) {
    this.node = node;
  }
}

class Tile {
  constructor(colour, title = null, price, rent, node) {
    this.colour = colour;
    this.title = title;
    this.price = price;
    this.rent = rent;
    this.node = node;
  }

  owner = null;

  isBought() {
    if (this.owner === null) {
      return false;
    } else {
      return true;
    }
  }

  isEmpty() {
    if (this.title === null) {
      return true;
    } else {
      return false;
    }
  }

  getPrice() {
    return this.price;
  }

  getRent() {
    return this.rent;
  }

  getNode() {
    return this.node;
  }

  getOwner() {
    return this.owner;
  }

  setOwner(player) {
    this.owner = player;
  }
}

const titleDeeds = [
  {
    colour: "BROWN",
    title: "OLD KENT ROAD",
    price: 60,
    rent: 2,
  },

  {
    colour: "BROWN",
    title: "WHITECHAPEL ROAD",
    price: 60,
    rent: 4,
  },

  {
    colour: "LIGHTBLUE",
    title: "THE ANGEL ISLINGTON ROAD",
    price: 100,
    rent: 6,
  },

  {
    colour: "LIGHTBLUE",
    title: "EUSTON ROAD",
    price: 100,
    rent: 6,
  },

  {
    colour: "LIGHTBLUE",
    title: "PENTONVILLE ROAD",
    price: 120,
    rent: 8,
  },

  {
    colour: "PINK",
    title: "PALL MALL",
    price: 140,
    rent: 10,
  },

  {
    colour: "PINK",
    title: "WHITEHALL",
    price: 140,
    rent: 10,
  },

  {
    colour: "PINK",
    title: "NORTHUMBERLAND AVENUE",
    price: 160,
    rent: 12,
  },

  {
    colour: "ORANGE",
    title: "BOW STREET",
    price: 180,
    rent: 14,
  },

  {
    colour: "ORANGE",
    title: "MARLBOROUGH STREET",
    price: 180,
    rent: 14,
  },

  {
    colour: "ORANGE",
    title: "VINE STREET",
    price: 200,
    rent: 16,
  },

  {
    colour: "RED",
    title: "STRAND",
    price: 220,
    rent: 18,
  },

  {
    colour: "RED",
    title: "FLEET STREET",
    price: 220,
    rent: 18,
  },

  {
    colour: "RED",
    title: "TRAFALGAR SQUARE",
    price: 240,
    rent: 20,
  },

  {
    colour: "YELLOW",
    title: "LEICESTER SQUARE",
    price: 260,
    rent: 22,
  },

  {
    colour: "YELLOW",
    title: "COVENTRY STREET",
    price: 260,
    rent: 22,
  },

  {
    colour: "YELLOW",
    title: "PICCADILLY",
    price: 280,
    rent: 24,
  },

  {
    colour: "GREEN",
    title: "REGENT STREET",
    price: 300,
    rent: 26,
  },

  {
    colour: "GREEN",
    title: "OXFORD STREET",
    price: 300,
    rent: 26,
  },

  {
    colour: "GREEN",
    title: "BOND STREET",
    price: 320,
    rent: 28,
  },

  {
    colour: "BLUE",
    title: "PARK LANE",
    price: 350,
    rent: 35,
  },

  {
    colour: "BLUE",
    title: "MAYFAIR",
    price: 400,
    rent: 50,
  },
];

function generateBackendBoard() {
  // in relation to front end divs
  const path = [
    39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    14, 17, 20, 23, 26, 29, 32, 35, 38, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
  ];

  const assignedDeeds = [
    1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34,
    37, 39,
  ];
  // create our path of traversal
  const tilesArray = [];
  const tiles = document.querySelectorAll(".tile");
  for (const pos of path) {
    newTile = new Tile();
    newTile.node = tiles[pos - 1];
    tilesArray.push(newTile);
  }

  for (let i = 0; i < assignedDeeds.length; i++) {
    const tileObj = tilesArray[assignedDeeds[i]];
    tileObj.node.style.backgroundColor = tileObj.colour = titleDeeds[i].colour;
    tileObj.title = titleDeeds[i].title;
    tileObj.price = titleDeeds[i].price;
    tileObj.rent = titleDeeds[i].rent;
  }

  return tilesArray;
}

// ==============================================================================
// Event Handlers
// ==============================================================================

function clickOnNewGame(event) {
  if (event.target.id !== "newGame") {
    return;
  }

  // check radio buttons that are selected
  let value = -1;
  const radioElements = document.getElementsByName("numOfPlayers");
  for (const radioElement of radioElements) {
    if (radioElement.checked) {
      value = radioElement.value;
    }
  }
  if (value === -1) {
    alert("Please select number of players");
    return;
  }
  generatePlayers(value);
  buildNewGame();
}

function clickOnRollDice(event) {
  if (event.target.id !== "rollDiceButton") {
    return;
  }
  const steps = rollDice();
  event.target.disabled = true;
  moveCurrentPlayer(steps);
  landOnTileEvent();
}

function clickOnBuyOrPass(event) {
  // check which button user clicks
  const target = event.target;
  if (target.id === "buyButton") {
    // backend
    const player = getCurrentPlayer();
    const tile = getCurrentTile();
    player.buyDeed(tile);
    // frontend
    target.parentNode.remove();
    nextPlayer();
  } else if (target.id === "passButton") {
    // frontend
    target.parentNode.remove();
    nextPlayer();
  }
}

// ============================================================================
// Game Functions
// ============================================================================
function getNumberOfPlayers() {
  return players.length;
}

function getCurrentPlayer() {
  return players[currPlayer]; // currPlayer has value 0 to 3
}

function getTileByPosition(position) {
  return tilesInOrderArray[position]; // position is 0-based indexing
}

function getCurrentTile() {
  const player = getCurrentPlayer();
  const currentPosition = player.getPosition();
  return getTileByPosition(currentPosition);
}

function generatePlayers(numOfPlayers) {
  for (let i = 1; i <= numOfPlayers; i++) {
    const newPlayer = new Player(i);
    players.push(newPlayer);
  }
}

function rollDice() {
  const numOfSides = 6;
  const numOfDices = 2;
  let sum = 0;
  for (let i = 0; i < numOfDices; i++) {
    value = Math.ceil(Math.random() * numOfSides);
    sum += value;
  }
  console.log(`You rolled ${sum}`);
  return sum;
}

function moveCurrentPlayer(steps) {
  // backend
  const player = getCurrentPlayer();
  player.move(steps);
  // frontend
  const newPosition = player.getPosition();
  const newTile = getTileByPosition(newPosition);
  newTile.getNode().append(player.node);
}

function nextPlayer() {
  // backend
  currPlayer++;
  currPlayer %= getNumberOfPlayers();
  // frontend
  const rollDiceButton = document.querySelector("#rollDiceButton")
  rollDiceButton.disabled = false;
  const currentPlayerLabel = document.querySelector("#currPlayer");
  currentPlayerLabel.innerHTML = currPlayer+1;
}

function payRent(tile) {
  const payer = getCurrentPlayer();
  const payee = tile.getOwner();
  const payment = tile.getRent();
  payer.pay(payee, payment);
}

function checkIfPlayerBuys(tile) {
  const screen = document.querySelector("#screen");
  // Container
  const newPrompt = document.createElement("div");
  newPrompt.id = "buyOrNotPrompt"
  // Deed
  const titleDeed = document.createElement("div");
  const colourBar = document.createElement("div");
  colourBar.id = "colourBar"
  colourBar.style.backgroundColor = tile.colour;
  const infoBlock = document.createElement("div");
  infoBlock.innerText = `${tile.title}
  Price: ${tile.price}
  Rent: ${tile.rent}
  `;
  titleDeed.append(colourBar, infoBlock);
  
  // Prompt
  const buyButton = document.createElement("button");
  buyButton.innerHTML = "Buy";
  buyButton.id = "buyButton";
  const passButton = document.createElement("button");
  passButton.innerHTML = "Pass";
  passButton.id = "passButton";
  newPrompt.append(titleDeed, buyButton, passButton);
  
  screen.append(newPrompt);
}

function landOnTileEvent() {
  const tile = getCurrentTile();
  // exit function the moment tile is empty
  if (tile.isEmpty()) {
    nextPlayer();
    return;
  }
  
  if (tile.isBought()) {
    payRent(tile);
    nextPlayer();
  } else {
    checkIfPlayerBuys(tile);
  }
}

// ======================================================================
// FrontEnd Only Functions
// ======================================================================
function buildGameBoard() {
  // build board using DOM
  const board = document.querySelector("#board");
  for (let i = 1; i <= 49; i++) {
    // populate gameboard with tiles
    const tile = document.createElement("div");
    tile.className = "tile";
    board.append(tile);
  }
}

function frontEndInitialization() {
  buildGameBoard();
}

function clearScreen() {
  const screen = document.querySelector("#screen");
  screen.innerHTML = "";
}

function buildStatusBar() {
  // container
  const screen = document.querySelector("#screen");
  const statusBar = document.createElement("div");
  statusBar.id = "statusBar";
  screen.append(statusBar);

  // first item: information about number of players playing
  const numOfPlayersLabel = document.createElement("div");
  const numOfPlayersHeading = document.createElement("div");
  numOfPlayersHeading.innerHTML = "No. of Players:";
  const numOfPlayersValue = document.createElement("div");
  numOfPlayersValue.innerHTML = getNumberOfPlayers();
  numOfPlayersLabel.append(numOfPlayersHeading, numOfPlayersValue);
  statusBar.append(numOfPlayersLabel);

  // second item: information about current player
  const currPlayerLabel = document.createElement("div");
  const currPlayerHeading = document.createElement("div");
  currPlayerHeading.innerHTML = "Current Player:";
  const currPlayerValue = document.createElement("div");
  currPlayerValue.id = "currPlayer";
  currPlayerValue.innerHTML = `Player ${currPlayer+1}`;
  currPlayerLabel.append(currPlayerHeading, currPlayerValue);
  statusBar.append(currPlayerLabel);

  // third item: roll dice button
  const rollDiceButton = document.createElement("button");
  rollDiceButton.id = "rollDiceButton";
  rollDiceButton.innerHTML = "ROLL DICE";
  statusBar.append(rollDiceButton);
}

function buildPlayerTokens() {
  const numOfPlayers = players.length;
  for (let i = 1; i <= numOfPlayers; i++) {
    // create token
    const player = players[i - 1];
    const tokenNode = document.createElement("div");
    tokenNode.className = `token player${i}`;
    tokenNode.innerHTML = i;

    // put node reference in player
    player.setNode(tokenNode);

    // place on starting position of board
    const startingTile = tilesInOrderArray[0];
    startingTile.getNode().append(tokenNode);
  }
}

function buildNewGame() {
  clearScreen();
  buildStatusBar();
  buildPlayerTokens();
}

// hoisting... bad practice but i want to at least get it to work
// global variables
let currPlayer = 0;
const players = [];
frontEndInitialization();
const tilesInOrderArray = generateBackendBoard(); // an array of tiles object
document.querySelector("#screen").addEventListener("click", clickOnNewGame);
document.querySelector("#screen").addEventListener("click", clickOnRollDice);
document.querySelector("#screen").addEventListener("click", clickOnBuyOrPass);
