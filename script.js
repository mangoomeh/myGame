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
    if (this.position >= 40) {
      this.money += 100;
    }
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

  getMoney() {
    return this.money;
  }

  getDeeds() {
    return this.ownedDeeds;
  }

  setNode(node) {
    this.node = node;
  }
}

class Tile {
  constructor(background, title = null, price, rent, node) {
    this.background = background;
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

function generateTilesArray() {
  // in relation to front end divs
  const path = [
    39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    14, 17, 20, 23, 26, 29, 32, 35, 38, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
  ];

  // create our path of traversal
  const tiles = document.querySelectorAll(".tile");
  for (const pos of path) {
    newTile = new Tile();
    newTile.node = tiles[pos - 1];
    tilesArray.push(newTile);
  }

  // colour and add information into our tiles object
  for (let i = 0; i < tilesInfo.length; i++) {
    const targetTileInfo = tilesInfo[i];
    const targetTileIndex = targetTileInfo.id;
    const tileObj = tilesArray[targetTileIndex];
    // colour or add background
    tileObj.node.style.background = targetTileInfo.background;
    tileObj.node.style.backgroundSize = "contain";
    tileObj.node.style.backgroundRepeat = "no-repeat";
    tileObj.node.style.backgroundPosition = "center";
    // add information to our tiles object
    tileObj.background = targetTileInfo.background;
    tileObj.title = targetTileInfo.title;
    tileObj.type = targetTileInfo.type;
    tileObj.price = targetTileInfo.price;
    tileObj.rent = targetTileInfo.rent * 5;
  }
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
    // check if player has enough money
    if (player.getMoney() < tile.price) {
      alert("You do not have enough money!");
      return;
    }
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

function clickPlayAgain(event) {
  if (event.target.id === "playAgainButton") {
    window.location.reload();
  }
}

function clickEndGame(event) {
  if (event.target.id === "endGameButton") {
    const rollDiceButton = document.querySelector("#rollDiceButton");
    rollDiceButton.disabled = true;
    gameOver();
  }
}

// ============================================================================
// SETUP THE GAME
// ============================================================================
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

function clearScreen() {
  const screen = document.querySelector("#screen");
  screen.innerHTML = "";
}

// ============================================================================
// START THE GAME
// ============================================================================
function buildStatusBar() {
  // container
  const screen = document.querySelector("#screen");
  const statusBar = document.createElement("div");
  statusBar.id = "statusBar";
  screen.append(statusBar);

  // first item: information about number of players playing
  const numOfPlayersLabel = document.createElement("div");
  const numOfPlayersHeading = document.createElement("div");
  numOfPlayersHeading.innerHTML = "Players:";
  const numOfPlayersValue = document.createElement("div");
  numOfPlayersValue.innerHTML = getNumberOfPlayers();
  numOfPlayersLabel.append(numOfPlayersHeading, numOfPlayersValue);
  statusBar.append(numOfPlayersLabel);

  // second item: information about current player
  const currPlayerLabel = document.createElement("div");
  const currPlayerHeading = document.createElement("div");
  currPlayerHeading.innerHTML = "Current:";
  const currPlayerValue = document.createElement("div");
  currPlayerValue.id = "currPlayer";
  currPlayerValue.innerHTML = `Player ${currPlayer + 1}`;
  currPlayerLabel.append(currPlayerHeading, currPlayerValue);
  statusBar.append(currPlayerLabel);

  // third item: roll dice button
  const rollDiceButton = document.createElement("button");
  rollDiceButton.id = "rollDiceButton";
  rollDiceButton.innerHTML = "ROLL DICE";
  statusBar.append(rollDiceButton);

  // fourth item: end game button
  const endGameButton = document.createElement("button");
  endGameButton.id = "endGameButton";
  endGameButton.innerHTML = "END GAME";
  statusBar.append(endGameButton);
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
    const startingTile = tilesArray[0];
    startingTile.getNode().append(tokenNode);
  }
}

function buildPlayerInfo() {
  for (const player of players) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "playerDiv";
    const nameDiv = document.createElement("div");
    nameDiv.style.fontWeight = "bold";
    const moneyDiv = document.createElement("div");
    const deedsDiv = document.createElement("div");

    nameDiv.innerText = `Player ${player.id}`;
    moneyDiv.innerText = `$${player.getMoney()}`;
    for (const deed of player.getDeeds()) {
      const deedDiv = document.createElement("div");
      deedDiv.innerText = deed.title;
      deedsDiv.append(deedDiv);
    }
    playerDiv.append(nameDiv, moneyDiv, deedsDiv);
    document.querySelector("#playerInfo").append(playerDiv);
  }
}

function refreshPlayerInfo() {
  const playerInfo = document.querySelector("#playerInfo");
  playerInfo.innerHTML = "";
  buildPlayerInfo();
}

function buildNewGame() {
  clearScreen();
  buildStatusBar();
  buildPlayerTokens();
  buildPlayerInfo();
}

// ============================================================================
// PLAY THE GAME
// ============================================================================
function getNumberOfPlayers() {
  return players.length;
}

function getCurrentPlayer() {
  return players[currPlayer]; // currPlayer has value 0 to 3
}

function getTileByPosition(position) {
  return tilesArray[position]; // position is 0-based indexing
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
  const rollDiceButton = document.querySelector("#rollDiceButton");
  rollDiceButton.disabled = false;
  const currentPlayerLabel = document.querySelector("#currPlayer");
  currentPlayerLabel.innerHTML = `Player ${currPlayer + 1}`;
  refreshPlayerInfo();
}

function checkIfPlayerBuys(tile) {
  const screen = document.querySelector("#screen");
  // Container
  const newPrompt = document.createElement("div");
  newPrompt.id = "buyOrNotPrompt";
  // Deed
  const titleDeed = buildTitleDeed(tile);
  // Prompt
  const buyButton = document.createElement("button");
  buyButton.innerHTML = "BUY";
  buyButton.id = "buyButton";
  const passButton = document.createElement("button");
  passButton.innerHTML = "PASS";
  passButton.id = "passButton";
  newPrompt.append(titleDeed, buyButton, passButton);

  screen.append(newPrompt);
}

function buildTitleDeed(tile) {
  const titleDeed = document.createElement("div");
  titleDeed.id = "titleDeed";
  const colourBar = document.createElement("div");
  colourBar.id = "colourBar";
  colourBar.style.background = tile.background;
  colourBar.style.backgroundSize = "contain";
  colourBar.style.backgroundRepeat = "no-repeat";
  colourBar.style.backgroundPosition = "center";
  const tileName = document.createElement("div");
  tileName.id = "tileName"
  tileName.innerHTML = `${tile.title}`;
  const infoBlock = document.createElement("div");
  infoBlock.id = "titleDeedInfoBlock";
  // items inside infoblock
  const rent = document.createElement("div");
  rent.innerText = `RENT $${tile.rent}`;
  const price = document.createElement("div");
  price.innerText = `PRICE $${tile.price}`;
  infoBlock.append(rent, price);
  if (tile.isBought()) {
    const owner = document.createElement("div");
    owner.innerHTML = `OWNED BY PLAYER ${tile.owner.id}`;
    infoBlock.append(owner);
  }
  titleDeed.append(colourBar, tileName, infoBlock);
  return titleDeed;
}

function landOnTileEvent() {
  const tile = getCurrentTile();
  // exit function the moment tile is empty
  if (tile.isEmpty()) {
    nextPlayer();
    return;
  }
  // check if tile is bought
  if (tile.isBought()) {
    const payer = getCurrentPlayer();
    const payee = tile.getOwner();
    const payment = tile.getRent();
    // check if player has money to pay rent
    if (payer.getMoney() < payment) {
      gameOver();
    } else {
      // pay rent
      payer.pay(payee, payment);
      // show what player paid for
      const messageContainer = document.createElement("div");
      messageContainer.id = "rentMessageContainer";
      const titleDeed = buildTitleDeed(tile);
      const paidMessage = document.createElement("div");
      paidMessage.innerHTML = `Player ${payer.id} paid Player ${payee.id} $${payment} for rent.`;
      const continueButton = document.createElement("button");
      continueButton.innerHTML = "CONTINUE";
      messageContainer.append(titleDeed, paidMessage, continueButton);
      // add to screen
      const screen = document.querySelector("#screen");
      screen.append(messageContainer);

      // nextPlayer();
    }
  } else {
    checkIfPlayerBuys(tile);
  }
}

function gameOver() {
  // find winner
  // sort by money
  players.sort((a, b) => b.getMoney() - a.getMoney());
  const winner = players[0];

  // create container
  const gameOverWindow = document.createElement("div");
  gameOverWindow.id = "gameOverWindow";

  // gameover logo
  const gameOverLogo = document.createElement("h3");
  gameOverLogo.innerHTML = "GAME OVER!";

  // create scoreboard
  const scoreBoard = document.createElement("div");
  scoreBoard.id = "scoreBoard";
  for (const player of players) {
    const entry = document.createElement("div");
    entry.innerHTML = `Player ${player.id} ${player.getMoney()}`;
    scoreBoard.append(entry);
  }

  // create play again button
  const playAgainButton = document.createElement("button");
  playAgainButton.id = "playAgainButton";
  playAgainButton.innerHTML = "Play Again!";

  // append into container
  gameOverWindow.append(gameOverLogo, scoreBoard, playAgainButton);

  // get screen
  const screen = document.querySelector("#screen");
  screen.append(gameOverWindow);

  // disable endGame buttono
  document.querySelector("#endGameButton").disabled = true;
}

// hoisting... bad practice but i want to at least get it to work
// global variables
let currPlayer = 0;
const players = [];
const tilesArray = [];
buildGameBoard();
generateTilesArray(); // an array of tiles object
document.querySelector("#screen").addEventListener("click", clickOnNewGame);
document.querySelector("#screen").addEventListener("click", clickOnRollDice);
document.querySelector("#screen").addEventListener("click", clickOnBuyOrPass);
document.querySelector("#screen").addEventListener("click", clickPlayAgain);
document.querySelector("#screen").addEventListener("click", clickEndGame);
