"use strict";

const refreshBtn = document.querySelector(".refreshBtn");
const photoBtn = document.querySelector(".photoBtn");
const playBtn = document.querySelector(".playBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const undoBtn = document.querySelector(".undoBtn");
const replayBtn = document.querySelector(".popUpReplayBtn");
const settingBtns = document.querySelector(".gameSettingBtns");

const timer = document.querySelector(".timer");
const movement = document.querySelector(".movement");
const ul = document.querySelector("ul");
const popUp = document.querySelector(".popUp");
const popUpMessage = document.querySelector(".popUpMessage");
const originalPhoto = document.querySelector(".originalPhoto");

let initTime = 0;
let startGameTimer;
let movementCount = 0;
let movementArray = [];
let swapCount;

refreshBtn.addEventListener("click", refreshGame);
photoBtn.addEventListener("click", changePhoto);
playBtn.addEventListener("click", startGame);

var setDimension = (event) => {
  const target = parseInt(event.target.id.charAt(0));
  if (target > 0) {
    createTileLists(target);
  }
};
settingBtns.addEventListener("click", setDimension);

function createTileLists(dimension) {
  ul.innerHTML = "";
  const TILE_NUM = dimension * dimension;
  const TILE_BACKGROUND_SIZE = 360;
  const TILE_WIDTH = TILE_BACKGROUND_SIZE / dimension;
  const TILE_HEIGHTH = TILE_BACKGROUND_SIZE / dimension;
  const x = TILE_WIDTH;
  const y = TILE_HEIGHTH;
  let num = 1;
  for (let i = 1; i <= TILE_NUM; i++) {
    ul.innerHTML += `<li class="tile${i}"></li>`;
  }
  for (let row = 1; row <= dimension; row++) {
    for (let col = 1; col <= dimension; col++) {
      let tiles = document.querySelector(`.tile${num}`);
      tiles.setAttribute("id", `cell${row}${col}`);
      tiles.style.left = `${x}` * (`${col}` - 1) + "px";
      tiles.style.top = `${y}` * (`${row}` - 1) + "px";
      tiles.style.width = `${TILE_WIDTH}px`;
      tiles.style.height = `${TILE_HEIGHTH}px`;
      tiles.style.backgroundPosition =
        -`${x}` * (`${col}` - 1) + "px " + -`${y}` * (`${row}` - 1) + "px";
      tiles.style.backgroundImage = `url(${originalPhoto.src})`;
      if (num === TILE_NUM) {
        tiles.style.backgroundImage = `url(imgs/emptyBackground.png)`;
      }
      num++;
    }
  }
}

function setGameTimer(resetTime) {
  if (resetTime === 0) {
    initTime = resetTime;
  }
  startGameTimer = setInterval(setTimerFunc, 1000);
}

function setTimerFunc() {
  ++initTime;
  let seconds = initTime % 60;
  let minutes = Math.floor((initTime / 60) % 60);
  let hours = Math.floor((initTime / 3600) % 60);
  let hour = hours < 10 ? "0" + hours : hours;
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = seconds < 10 ? "0" + seconds : seconds;
  timer.innerHTML = `Time - ${hour}:${min}:${sec}`;
}

function displayMoveMentNumber(numberChange) {
  numberChange;
  swapCount = movementCount - ul.childElementCount;
  movement.innerHTML = `Movement : ${swapCount}`;
}

function replayGame() {
  timer.innerHTML = `Time - 00:00:00`;
  movement.innerHTML = `Movement : 0`;
  ul.innerHTML = "";
  popUp.style.visibility = "hidden";
  settingBtns.addEventListener("click", setDimension);
  playBtn.addEventListener("click", startGame);
}

function display(message) {
  clearInterval(startGameTimer);
  popUp.style.visibility = "visible";
  popUpMessage.innerHTML = `${message}`;
  replayBtn.addEventListener("click", replayGame);
  shuffleBtn.removeEventListener("click", shuffle);
  undoBtn.removeEventListener("click", undoMovement);
  settingBtns.removeEventListener("click", setDimension);
  ul.removeEventListener("click", clickTile);
}

function startGame() {
  if (ul.childElementCount === 0) {
    alert("3x3 / 4x4 / 5x5 중 하나를 선택하세요");
  } else {
    setGameTimer(0);
    playBtn.removeEventListener("click", startGame);
    shuffleBtn.addEventListener("click", shuffle);
    undoBtn.addEventListener("click", undoMovement);
    ul.addEventListener("click", clickTile);
    settingBtns.removeEventListener("click", setDimension);
    //shuffle();
  }
}

function shuffle() {
  movementCount = 0;
  const dimension = Math.sqrt(ul.childElementCount);
  for (let row1 = 1; row1 <= dimension; row1++) {
    for (let column = 1; column <= dimension; column++) {
      let row2 = Math.floor(Math.random() * dimension + 1);
      let column2 = Math.floor(Math.random() * dimension + 1);
      swapTiles("cell" + row1 + column, "cell" + row2 + column2);
    }
  }
  checkSolution("shuffle");
}

function undoMovement() {
  if (swapCount > 0) {
    let cell2 = movementArray.slice(-1);
    movementArray.pop();
    let cell1 = movementArray.slice(-1);
    movementArray.pop();
    swapTiles(cell2, cell1, "undo");
  }
}

function refreshGame() {
  clearInterval(startGameTimer);
  replayGame();
}

function changePhoto() {
  if (originalPhoto.alt === "game1") {
    originalPhoto.src = "imgs/game2.png";
    originalPhoto.alt = "game2";
  } else if (originalPhoto.alt === "game2") {
    originalPhoto.src = "imgs/game3.png";
    originalPhoto.alt = "game3";
  } else if (originalPhoto.alt === "game3") {
    originalPhoto.src = "imgs/game1.png";
    originalPhoto.alt = "game1";
  }
  if (ul.childElementCount !== 0) {
    for (let i = 1; i < ul.childElementCount; i++) {
      const tiles = document.querySelector(`.tile${i}`);
      tiles.style.backgroundImage = `url(${originalPhoto.src})`;
    }
  }
}

function swapTiles(cell1, cell2, doOrUndo) {
  let cellA = document.querySelector(`#${cell1}`);
  let cellB = document.querySelector(`#${cell2}`);

  let tileClass = cellA.className;
  cellA.className = cellB.className;
  cellB.className = tileClass;

  let tileBgPosition = cellA.style.backgroundPosition;
  cellA.style.backgroundPosition = cellB.style.backgroundPosition;
  cellB.style.backgroundPosition = tileBgPosition;

  let tileBgImg = cellA.style.backgroundImage;
  cellA.style.backgroundImage = cellB.style.backgroundImage;
  cellB.style.backgroundImage = tileBgImg;

  if (!doOrUndo) {
    displayMoveMentNumber(++movementCount);
    movementArray.push(cell2);
    movementArray.push(cell1);
  } else if (doOrUndo === "undo") {
    displayMoveMentNumber(--movementCount);
  }
  checkSolution();
}

var clickTile = (event) => {
  const tileNum = ul.childElementCount;
  const dimension = Math.sqrt(tileNum);
  const row = parseInt(event.target.id.charAt(4));
  const column = parseInt(event.target.id.charAt(5));
  const lastTile = document.querySelector(`.tile${tileNum}`);
  const rightTile = document.querySelector("#cell" + row + (column + 1));
  const leftTile = document.querySelector("#cell" + row + (column - 1));
  const aboveTile = document.querySelector("#cell" + (row - 1) + column);
  const belowTile = document.querySelector("#cell" + (row + 1) + column);
  if (event.target.className != lastTile) {
    //Checking if white tile on the right
    if (column < dimension) {
      if (rightTile.className === lastTile.className) {
        swapTiles("cell" + row + column, "cell" + row + (column + 1));
        return;
      }
    }
    //Checking if white tile on the left
    if (column > 1) {
      if (leftTile.className === lastTile.className) {
        swapTiles("cell" + row + column, "cell" + row + (column - 1));
        return;
      }
    }
    //Checking if white tile is above
    if (row > 1) {
      if (aboveTile.className === lastTile.className) {
        swapTiles("cell" + row + column, "cell" + (row - 1) + column);
        return;
      }
    }
    //Checking if white tile is below
    if (row < dimension) {
      if (belowTile.className === lastTile.className) {
        swapTiles("cell" + row + column, "cell" + (row + 1) + column);
        return;
      }
    }
  }
};

function checkSolution(shuffle) {
  let checkTileNum = 0;
  for (let i = 1; i <= ul.childElementCount; i++) {
    let tileClassName = document.querySelectorAll("li")[`${i - 1}`].className;
    let allTiles = `tile${i}`;
    if (tileClassName === allTiles) {
      checkTileNum++;
    }
    if (checkTileNum === ul.childElementCount) {
      if (shuffle === "shuffle") {
        shuffle();
      } else {
        display("Good Job ! 👍");
      }
    }
  }
}
