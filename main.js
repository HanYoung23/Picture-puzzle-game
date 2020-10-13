"use strict";

const refreshBtn = document.querySelector(".refreshBtn");
const photoBtn = document.querySelector(".photoBtn");
const playBtn = document.querySelector(".playBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const undoBtn = document.querySelector(".undoBtn");
const replayBtn = document.querySelector(".popUpReplayBtn");
const threeDimensionBtn = document.querySelector(".threeByThree");
const fourDimensionBtn = document.querySelector(".fourByFour");
const fiveDimensionBtn = document.querySelector(".fiveByFive");

const timer = document.querySelector(".timer");
const movement = document.querySelector(".movement");
const ul = document.querySelector("ul");
const popUp = document.querySelector(".popUp");
const popUpMessage = document.querySelector(".popUpMessage");
const originalPhoto = document.querySelector(".originalPhoto");

let initTime = 0;
let startGameTimer;
let movementCount = 0;
let movemoentArray = [];
let swapCount;
let dimensionOnOff;
let clickTileOnOff = "on";

let DIMENSION = 0;
let TILE_NUMBER;
let TILE_BACKGROUND_SIZE = 360;
let TILE_WIDTH = TILE_BACKGROUND_SIZE / DIMENSION;
let TILE_HEIGHTH = TILE_BACKGROUND_SIZE / DIMENSION;

replayBtn.addEventListener("click", replayGame);
refreshBtn.addEventListener("click", refreshGame);
photoBtn.addEventListener("click", changePhoto);
playBtn.addEventListener("click", startGame);
threeDimensionBtn.addEventListener("click", () => {
  changeDimension(3);
});
fourDimensionBtn.addEventListener("click", () => {
  changeDimension(4);
});
fiveDimensionBtn.addEventListener("click", () => {
  changeDimension(5);
});

function changeDimension(dimensionOrSwitch) {
  if (dimensionOrSwitch === "on") {
    dimensionOnOff = "on";
    return;
  } else if (dimensionOrSwitch === "off") {
    dimensionOnOff = "off";
    return;
  } else if (dimensionOnOff !== "off" && Number.isInteger(dimensionOrSwitch)) {
    createTileLists(dimensionOrSwitch);
  }
}

function refreshGame() {
  clearInterval(startGameTimer);
  replayGame();
}

function replayGame() {
  timer.innerHTML = `Time - 00:00:00`;
  movement.innerHTML = `Movement : 0`;
  DIMENSION = 0;
  ul.innerHTML = "";
  popUp.style.visibility = "hidden";
  changeDimension("on");
  controlFunctionBtns("playBtn", "add", startGame);
}

function startGame() {
  if (DIMENSION === 0) {
    alert("3x3 / 4x4 / 5x5 중 하나를 선택하세요");
  } else {
    setGameTimer(0);
    controlFunctionBtns("playBtn", "remove", startGame);
    controlFunctionBtns("shuffleBtn", "add", shuffle);
    controlFunctionBtns("undoBtn", "add", undoMovement);
    controlClickTile("on");
    changeDimension("off");
    if (checkSolution) {
      shuffle();
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
  swapCount = movementCount - TILE_NUMBER;
  movement.innerHTML = `Movement : ${swapCount}`;
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
  if (DIMENSION !== 0) {
    for (let i = 1; i < TILE_NUMBER; i++) {
      const tiles = document.querySelector(`.tile${i}`);
      tiles.style.backgroundImage = `url(${originalPhoto.src})`;
    }
  }
}

function createTileLists(dimension) {
  ul.innerHTML = "";
  DIMENSION = dimension;
  TILE_NUMBER = DIMENSION * DIMENSION;
  TILE_WIDTH = TILE_BACKGROUND_SIZE / DIMENSION;
  TILE_HEIGHTH = TILE_BACKGROUND_SIZE / DIMENSION;
  let x = TILE_WIDTH;
  let y = TILE_HEIGHTH;
  let row;
  let col = 1;
  let n = 1;
  for (let i = 1; i <= TILE_NUMBER; i++) {
    ul.innerHTML += `<li class="tile${i}"></li>`;
  }
  for (row = 1; row <= DIMENSION; row++) {
    for (col = 1; col <= DIMENSION; col++) {
      const tiles = document.querySelector(`.tile${n}`);
      tiles.setAttribute("id", `cell${row}${col}`);
      tiles.setAttribute("onclick", `clickTile(${row},${col})`);
      tiles.style.left = `${x}` * (`${col}` - 1) + "px";
      tiles.style.top = `${y}` * (`${row}` - 1) + "px";
      tiles.style.width = `${TILE_WIDTH}px`;
      tiles.style.height = `${TILE_HEIGHTH}px`;
      tiles.style.backgroundPosition =
        -`${x}` * (`${col}` - 1) + "px " + -`${y}` * (`${row}` - 1) + "px";
      tiles.style.backgroundImage = `url(${originalPhoto.src})`;
      if (n === TILE_NUMBER) {
        tiles.style.backgroundImage = "url(" + "imgs/emptyBackground.png" + ")";
      }
      n++;
    }
  }
  controlFunctionBtns("playBtn", "add", startGame);
  controlFunctionBtns("shuffleBtn", "remove", shuffle);
  controlClickTile("off");
}

function controlClickTile(onOff) {
  clickTileOnOff = onOff;
}

function shuffle() {
  movementCount = 0;
  for (let row1 = 1; row1 <= DIMENSION; row1++) {
    for (let column = 1; column <= DIMENSION; column++) {
      let row2 = Math.floor(Math.random() * DIMENSION + 1);
      let column2 = Math.floor(Math.random() * DIMENSION + 1);
      swapTiles("cell" + row1 + column, "cell" + row2 + column2);
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
    movemoentArray.push(cell2);
    movemoentArray.push(cell1);
  } else if (doOrUndo === "undo") {
    displayMoveMentNumber(--movementCount);
  }
  checkSolution();
}

function clickTile(row, column) {
  const lastTile = document.querySelector(`.tile${TILE_NUMBER}`).className;
  if (clickTileOnOff === "on") {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    if (tile != lastTile) {
      //Checking if white tile on the right
      if (column < DIMENSION) {
        if (
          document.getElementById("cell" + row + (column + 1)).className ==
          lastTile
        ) {
          swapTiles("cell" + row + column, "cell" + row + (column + 1));
          return;
        }
      }
      //Checking if white tile on the left
      if (column > 1) {
        if (
          document.getElementById("cell" + row + (column - 1)).className ==
          lastTile
        ) {
          swapTiles("cell" + row + column, "cell" + row + (column - 1));
          return;
        }
      }
      //Checking if white tile is above
      if (row > 1) {
        if (
          document.getElementById("cell" + (row - 1) + column).className ==
          lastTile
        ) {
          swapTiles("cell" + row + column, "cell" + (row - 1) + column);
          return;
        }
      }
      //Checking if white tile is below
      if (row < DIMENSION) {
        if (
          document.getElementById("cell" + (row + 1) + column).className ==
          lastTile
        ) {
          swapTiles("cell" + row + column, "cell" + (row + 1) + column);
          return;
        }
      }
    }
  }
}

function undoMovement() {
  if (swapCount > 0) {
    let cell2 = movemoentArray.slice(-1);
    movemoentArray.pop();
    let cell1 = movemoentArray.slice(-1);
    movemoentArray.pop();
    swapTiles(cell2, cell1, "undo");
  }
}

function checkSolution() {
  if (swapCount !== 0) {
    let checkTileNum = 0;
    for (let i = 1; i <= TILE_NUMBER; i++) {
      let tileClassName = document.querySelectorAll("li")[`${i - 1}`].className;
      let tileNumber = `tile${i}`;
      if (tileClassName === tileNumber) {
        checkTileNum++;
        if (checkTileNum === TILE_NUMBER) {
          displayPopUp("Good Job ! 👍");
        }
      }
    }
  }
}

function displayPopUp(message) {
  popUp.style.visibility = "visible";
  popUpMessage.innerHTML = `${message}`;
  clearInterval(startGameTimer);
  controlFunctionBtns("shuffleBtn", "remove", shuffle);
  controlFunctionBtns("undoBtn", "remove", undoMovement);
  changeDimension("off");
  controlClickTile("off");
}

function controlFunctionBtns(btnName, removeOrAdd, functionName) {
  const btnSelector = document.querySelector(`.${btnName}`);
  const btnFunction = functionName;
  if (removeOrAdd === "remove") {
    btnSelector.removeEventListener("click", btnFunction);
  } else if (removeOrAdd === "add") {
    btnSelector.addEventListener("click", btnFunction);
  }
}
