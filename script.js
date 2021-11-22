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
    colour: "LIGHT BLUE",
    title: "THE ANGEL ISLINGTON ROAD",
    price: 100,
    rent: 6,
  },

  {
    colour: "LIGHT BLUE",
    title: "EUSTON ROAD",
    price: 100,
    rent: 6,
  },

  {
    colour: "LIGHT BLUE",
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
document.querySelector("#screen").addEventListener("click", newGame);

function main(numOfPlayers) {
  // create players
  const players = []
  for (let i = 0; i < numOfPlayers; i++) {
    players.push(new Player(i+1))
  }
  console.log(players)
}
