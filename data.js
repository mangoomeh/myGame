// datafile
const tilesInfo = [
  // {
  //   id: 0,
  //   background: "url('./images/go.png')",
  //   title: "GO",
  //   type: "go"
  // },
  
  {
    id: 1,
    background: "BROWN",
    title: "OLD KENT ROAD",
    price: 60,
    rent: 2,
    type: "deed"
  },

  // {
  //   id: 2,
  //   background: "",
  //   title: "Community Chest"
  //   type: "action"
  // },

  {
    id: 3,
    background: "BROWN",
    title: "WHITECHAPEL ROAD",
    price: 60,
    rent: 4,
    type: "deed"
  },

  // {
  //   id: 4,
  //   background: "",
  //   title: "Income Tax"
  //   type: "action"
  // },

  {
    id: 5,
    background: 'url("./images/train.jpg")',
    title: "KING CROSS STATION",
    price: 200,
    rent: 25,
    type: "station"
  },

  {
    id: 6,
    background: "LIGHTBLUE",
    title: "THE ANGEL ISLINGTON ROAD",
    price: 100,
    rent: 6,
    type: "deed"
  },

  // {
  //   id: 7,
  //   background: "",
  //   title: "Chance"
  //   type: "action"
  // },

  {
    id: 8,
    background: "LIGHTBLUE",
    title: "EUSTON ROAD",
    price: 100,
    rent: 6,
    type: "deed"
  },

  {
    id: 9,
    background: "LIGHTBLUE",
    title: "PENTONVILLE ROAD",
    price: 120,
    rent: 8,
    type: "deed"
  },

  // {
  //   id: 10,
  //   background: "",
  //   title: "Jail"
  //   type: "rest"
  // },

  {
    id: 11,
    background: "PINK",
    title: "PALL MALL",
    price: 140,
    rent: 10,
    type: "deed"
  },

  {
    id: 12,
    background: "url('./images/lightBulb.jpg')",
    title: "ELECTRIC COMPANY",
    price: 150,
    rent: 15,
    type: "utility"
  },

  {
    id: 13,
    background: "PINK",
    title: "WHITEHALL",
    price: 140,
    rent: 10,
    type: "deed"
  },

  {
    id: 14,
    background: "PINK",
    title: "NORTHUMBERLAND AVENUE",
    price: 160,
    rent: 12,
    type: "deed"
  },
  
  {
    id: 15,
    background: 'url("./images/train.jpg")',
    title: "MARYLEBONE STATION",
    price: 200,
    rent: 25,
    type: "station"
  },
  
  {
    id: 16,
    background: "ORANGE",
    title: "BOW STREET",
    price: 180,
    rent: 14,
    type: "deed"
  },

  // {
  //   id: 17,
  //   background: "",
  //   title: "Community Chest"
  //   type: "action"
  // },

  {
    id: 18,
    background: "ORANGE",
    title: "MARLBOROUGH STREET",
    price: 180,
    rent: 14,
    type: "deed"
  },

  {
    id: 19,
    background: "ORANGE",
    title: "VINE STREET",
    price: 200,
    rent: 16,
    type: "deed"
  },

  // {
  //   id: 20,
  //   background: "",
  //   title: "Free Parking"
  //   type: "rest"
  // },

  {
    id: 21,
    background: "RED",
    title: "STRAND",
    price: 220,
    rent: 18,
    type: "deed"
  },

  // {
  //   id: 22,
  //   background: "",
  //   title: "Chance"
  //   type: "action"
  // },

  {
    id: 23,
    background: "RED",
    title: "FLEET STREET",
    price: 220,
    rent: 18,
    type: "deed"
  },

  {
    id: 24,
    background: "RED",
    title: "TRAFALGAR SQUARE",
    price: 240,
    rent: 20,
    type: "deed"
  },

  {
    id: 25,
    background: 'url("./images/train.jpg")',
    title: "FENCHURCH ST. STATION",
    price: 200,
    rent: 25,
    type: "station"
  },

  {
    id: 26,
    background: "YELLOW",
    title: "LEICESTER SQUARE",
    price: 260,
    rent: 22,
    type: "deed"
  },

  {
    id: 27,
    background: "YELLOW",
    title: "COVENTRY STREET",
    price: 260,
    rent: 22,
    type: "deed"
  },

  {
    id: 28,
    background: "url('./images/waterTap.png')",
    title: "WATER WORKS",
    price: 150,
    rent: 15,
    type: "utility"
  },

  {
    id: 29,
    background: "YELLOW",
    title: "PICCADILLY",
    price: 280,
    rent: 24,
    type: "deed"
  },

  // {
  //   id: 30,
  //   background: "",
  //   title: "Go To Jail"
  //   type: "action"
  // },

  {
    id: 31,
    background: "GREEN",
    title: "REGENT STREET",
    price: 300,
    rent: 26,
    type: "deed"
  },

  {
    id: 32,
    background: "GREEN",
    title: "OXFORD STREET",
    price: 300,
    rent: 26,
    type: "deed"
  },

  // {
  //   id: 33,
  //   background: "",
  //   title: "Community Chest"
  //   type: "action"
  // },

  { 
    id: 34,
    background: "GREEN",
    title: "BOND STREET",
    price: 320,
    rent: 28,
    type: "deed"
  },
  
  {
    id: 35,
    background: 'url("./images/train.jpg")',
    title: "LIVERPOOL ST. STATION",
    price: 200,
    rent: 25,
    type: "station"
  },

  // {
  //   id: 36,
  //   background: "",
  //   title: "Chance"
  //   type: "action"
  // },
  
  { 
    id: 37,
    background: "BLUE",
    title: "PARK LANE",
    price: 350,
    rent: 35,
    type: "deed"
  },

  // {
  //   id: 38,
  //   background: "",
  //   title: "Super Tax"
  //   type: "tax"
  // },

  { 
    id: 39,
    background: "BLUE",
    title: "MAYFAIR",
    price: 400,
    rent: 50,
    type: "deed"
  },
];
