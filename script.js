class Player {
  constructor(id) {
    this.id = id;
  }

  position = 0;
  ownedDeeds = [];
  money = 1000;

  diceRoll() {
    dice1 = Math.ceil(Math.random() * 6);
    dice2 = Math.ceil(Math.random() * 6);
    position += dice1 + dice2;
  }

  buyDeed(deed) {
    this.money -= deed.price;
    this.ownedDeeds.push(deed);
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

const deedPositions = [
  [29, 35],
  [20, 14, 11],
  [1, 3, 4],
  [6, 8, 9],
  [13, 19, 22],
  [28, 31, 37],
  [47, 46, 44],
  [41, 39],
];

function generateBoard() {
  const board = document.querySelector("#board");
  for (let i = 0; i < 49; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = i;
    board.append(tile);
  }
  const tiles = board.childNodes
  console.log(tiles)
  for (const list of deedPositions) {
    for (const deed of list) {
      board.childNodes[deed].style.backgroundColor = titleDeeds.pop().colour
    }
  }
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

function main(numOfPlayers) {
  const screen = document.querySelector("#screen");
  screen.innerHTML = "";
  
  // create information labels
  const numOfPlayersLabel = document.createElement("div");
  const numOfPlayersLabel_h2 = document.createElement("h2");
  numOfPlayersLabel_h2.innerHTML = "No. of Players:";
  const numOfPlayersLabel_h1 = document.createElement("h1");
  numOfPlayersLabel_h1.innerHTML = numOfPlayers;
  numOfPlayersLabel.append(numOfPlayersLabel_h2, numOfPlayersLabel_h1);
  screen.append(numOfPlayersLabel);
  
  const currPlayerLabel = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.innerHTML = "Current Player:"
  const h1 = document.createElement("h1")
  h1.innerHTML = "Player 1"

  // create players
  const players = [];
  for (let i = 0; i < numOfPlayers; i++) {
    players.push(new Player(i + 1));
  }
}

generateBoard();
document.querySelector("#screen").addEventListener("click", newGame);