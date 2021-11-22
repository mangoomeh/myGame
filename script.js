class Player {
  constructor(id, node) {
    this.id = id;
    this.node = node;
  }

  position = 0;
  ownedDeeds = [];
  money = 1000;

  diceRoll() {
    const dice1 = Math.ceil(Math.random() * 6);
    const dice2 = Math.ceil(Math.random() * 6);
    this.position += dice1 + dice2;
    if (this.position >= 40) {
      this.position -= 40;
    }
  }

  buyDeed(deed) {
    this.money -= deed.price;
    this.ownedDeeds.push(deed);
    deed.owner = this;
  }

  getPosition() {
    return this.position;
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

function generateFrontendBoard() {
  const board = document.querySelector("#board");
  for (let i = 1; i <= 49; i++) {
    // create board on html using divs
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = `tile${i}`;
    board.append(tile);
  }
}

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

function newGame(event) {
  if (event.target.id !== "newGame") {
    return;
  }
  let checked = false;
  let value = 0;
  for (const radio of document.getElementsByName("numberOfPlayers")) {
    if (radio.checked) {
      checked = true;
      value = radio.value;
    }
  }
  if (!checked) {
    alert("Please select number of players");
    return;
  }
  main(value);
}

function getCurrentPlayer() {
  return players[currPlayer - 1];
}

function getTileByPosition(pos) {
  return path[pos];
}

function diceRoll() {
  getCurrentPlayer().diceRoll();
  updatePlayerFrontendPosition();
  // checkTile();
  nextPlayer();
}

function updatePlayerFrontendPosition() {
  const player = getCurrentPlayer();
  const newPosition = player.getPosition();
  getTileByPosition(newPosition).node.append(player.node);
}

function nextPlayer() {
  if (currPlayer === 4) {
    currPlayer = 1;
  } else {
    currPlayer += 1;
  }
  updateFrontendCurrentPlayer();
}

function updateFrontendCurrentPlayer() {
  const currentPlayerLabel = document.querySelector("#currPlayer");
  currentPlayerLabel.innerHTML = currPlayer;
}

function checkTile() {
  const position = getCurrentPlayer().getPosition();
  const tile = getTileByPosition(position);
  if (tile.isEmpty()) {
    return;
  } else if (tile.isBought()) {
    payRent(tile);
  } else {
    checkIfPlayerBuys(tile);
  }
}

function payRent(tile) {
  const payer = getCurrentPlayer();
  const payee = tile.owner;
  const payment = tile.rent;
  payer.money -= payment;
  payee.money += payment;
}

function checkIfPlayerBuys(tile) {
  // if player buys, player.buyDeed(tile)
  // if player doesn't buy return
}

function main(numOfPlayers) {
  // clear screen
  const screen = document.querySelector("#screen");
  screen.innerHTML = "";

  // create status bar and add to screen
  const statusBar = document.createElement("div");
  statusBar.id = "statusBar";
  screen.append(statusBar);

  const numOfPlayersLabel = document.createElement("div");
  const numOfPlayersLabel_1 = document.createElement("div");
  numOfPlayersLabel_1.innerHTML = "No. of Players:";
  const numOfPlayersLabel_2 = document.createElement("div");
  numOfPlayersLabel_2.innerHTML = numOfPlayers;
  numOfPlayersLabel.append(numOfPlayersLabel_1, numOfPlayersLabel_2);
  statusBar.append(numOfPlayersLabel);

  const currPlayerLabel = document.createElement("div");
  const currPlayerLabel_1 = document.createElement("div");
  currPlayerLabel_1.innerHTML = "Current Player:";
  const currPlayerLabel_2 = document.createElement("div");
  currPlayerLabel_2.id = "currPlayer";
  currPlayerLabel_2.innerHTML = `Player ${currPlayer}`;
  currPlayerLabel.append(currPlayerLabel_1, currPlayerLabel_2);
  statusBar.append(currPlayerLabel);

  // add roll dice button
  const rollDiceButton = document.createElement("button");
  rollDiceButton.addEventListener("click", diceRoll);
  rollDiceButton.id = "rollDiceButton";
  rollDiceButton.innerHTML = "ROLL DICE";
  statusBar.append(rollDiceButton);

  // create players

  for (let i = 1; i <= numOfPlayers; i++) {
    const newNode = document.createElement("div");
    newNode.className = `token player${i}`;
    newNode.innerHTML = i;
    players.push(new Player(i + 1, newNode));
    document.querySelector("#tile39").append(newNode);
  }
}

// hoisting... bad practice but i want to at least get it to work
// global variables
let currPlayer = 1;
const players = [];
generateFrontendBoard(); // to build our board using DOM
const path = generateBackendBoard(); // an array of tiles object
document.querySelector("#screen").addEventListener("click", newGame); // run our game
