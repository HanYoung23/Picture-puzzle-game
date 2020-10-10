const playBtn = document.querySelector(".playBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const photoChangeBtn = document.querySelector(".photoChangeBtn");
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

let initTime = 0;
let startGameTimer;
let movementCount = 0;
let movemoentArray = [];
let swapCount;

// 타일 생성 변수
let DIMENSION;
let TILE_NUMBER;
let TILE_BACKGROUND_SIZE = 360;
let TILE_WIDTH = TILE_BACKGROUND_SIZE / DIMENSION;
let TILE_HEIGHTH = TILE_BACKGROUND_SIZE / DIMENSION;

var addPlayBtnEvent = playBtn.addEventListener("click", startGame);
var addShuffleBtnEvent = shuffleBtn.addEventListener("click", shuffle);
var addUndoBtnEvent = undoBtn.addEventListener("click", undoMovement);
var addReplayBtnEvent = replayBtn.addEventListener("click", replayGame);
var addThreeByThreeBtnEvent = threeDimensionBtn.addEventListener(
  "click",
  changeDimensionThree
);
var addFourByFourBtnEvent = fourDimensionBtn.addEventListener(
  "click",
  changeDimensionFour
);
var addFiveByFiveBtnEvent = fiveDimensionBtn.addEventListener(
  "click",
  changeDimensionFive
);

BtnOnAndOff("shuffleBtnOff");

function changeDimensionThree() {
  createTileLists(3);
}
function changeDimensionFour() {
  createTileLists(4);
}
function changeDimensionFive() {
  createTileLists(5);
}

function startGame() {
  if (DIMENSION === undefined) {
    alert("Dimension을 선택하세요");
  } else {
    BtnOnAndOff("playBtnOff");
    setGameTimer(0);
    shuffle();
    BtnOnAndOff("shuffleBtnOn");
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
  hour = hours < 10 ? "0" + hours : hours;
  min = minutes < 10 ? "0" + minutes : minutes;
  sec = seconds < 10 ? "0" + seconds : seconds;
  timer.innerHTML = `Time - ${hour}:${min}:${sec}`;
}

function displayMoveMentNumber(numberChange) {
  numberChange;
  swapCount = movementCount - TILE_NUMBER;
  movement.innerHTML = `Movement : ${swapCount}`;
}

// ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
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
      // tiles.style.backgroundImage = "url(" + "imgs/game2.png" + ")";
      n++;
      if (n === TILE_NUMBER) {
        tiles.style.backgroundPosition = "null";
      }
    }
  }
  BtnOnAndOff("playBtnOn");
}

function shuffle() {
  movementCount = 0;
  for (let row1 = 1; row1 <= 3; row1++) {
    for (let column = 1; column <= 3; column++) {
      let row2 = Math.floor(Math.random() * 3 + 1);
      let column2 = Math.floor(Math.random() * 3 + 1);
      swapTiles("cell" + row1 + column, "cell" + row2 + column2);
    }
  }
}

function swapTiles(cell1, cell2, doOrUndo) {
  document.getElementById(cell1);
  let temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(
    cell2
  ).className;
  document.getElementById(cell2).className = temp;

  document.getElementById(cell1);
  let tileBg = document.getElementById(cell1).style.backgroundPosition;
  document.getElementById(
    cell1
  ).style.backgroundPosition = document.getElementById(
    cell2
  ).style.backgroundPosition;
  document.getElementById(cell2).style.backgroundPosition = tileBg;

  // document.querySelector(`.tile${TILE_NUMBER}`).style.background = "white";
  //undo
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
  if (initTime > 0) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    if (tile != "tile9") {
      //Checking if white tile on the right
      if (column < 3) {
        if (
          document.getElementById("cell" + row + (column + 1)).className ==
          "tile9"
        ) {
          swapTiles("cell" + row + column, "cell" + row + (column + 1));
          return;
        }
      }
      //Checking if white tile on the left
      if (column > 1) {
        if (
          document.getElementById("cell" + row + (column - 1)).className ==
          "tile9"
        ) {
          swapTiles("cell" + row + column, "cell" + row + (column - 1));
          return;
        }
      }
      //Checking if white tile is above
      if (row > 1) {
        if (
          document.getElementById("cell" + (row - 1) + column).className ==
          "tile9"
        ) {
          swapTiles("cell" + row + column, "cell" + (row - 1) + column);
          return;
        }
      }
      //Checking if white tile is below
      if (row < 3) {
        if (
          document.getElementById("cell" + (row + 1) + column).className ==
          "tile9"
        ) {
          swapTiles("cell" + row + column, "cell" + (row + 1) + column);
          return;
        }
      }
    }
  }
}

//ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ

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
    checkTileNum = 0;
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
  BtnOnAndOff("allBtnOff");
}

function replayGame() {
  startGame();
  popUp.style.visibility = "hidden";
  BtnOnAndOff("allBtnOn");
}

function BtnOnAndOff(onAndOff) {
  switch (onAndOff) {
    case "playBtnOff":
      playBtn.removeEventListener("click", startGame);
      break;
    case "shuffleBtnOn":
      shuffleBtn.addEventListener("click", shuffle);
      break;
    case "shuffleBtnOff":
      shuffleBtn.removeEventListener("click", shuffle);
      break;
    case "allBtnOn":
      shuffleBtn.addEventListener("click", shuffle);
      undoBtn.addEventListener("click", undoMovement);
      // 44,55버튼
      break;
    case "allBtnOff":
      shuffleBtn.removeEventListener("click", shuffle);
      undoBtn.removeEventListener("click", undoMovement);
      // 44,55버튼
      break;
  }
}

// 난이도 바꾸기
//https://codepen.io/bongam/pen/yrwYWJ
