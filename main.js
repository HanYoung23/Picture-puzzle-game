const threeBtn = document.querySelector(".threeBythree");
const playBtn = document.querySelector(".playBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const photoChangeBtn = document.querySelector(".photoChangeBtn");
const undoBtn = document.querySelector(".undoBtn");
const replayBtn = document.querySelector(".popUpReplayBtn");

const timer = document.querySelector(".timer");
const movement = document.querySelector(".movement");
const ul = document.querySelector("ul");
const popUp = document.querySelector(".popUp");
const popUpMessage = document.querySelector(".popUpMessage");

let initTime = 0;
let startGameTimer;
let movementCount = 0;
let TILENUMBER = 9;
let movemoentArray = [];
let swapCount;

var addPlayBtnEvent = playBtn.addEventListener("click", startGame);
var addShuffleBtnEvent = shuffleBtn.addEventListener("click", shuffle);
var addUndoBtnEvent = undoBtn.addEventListener("click", undoMovement);
var addReplayBtnEvent = replayBtn.addEventListener("click", replayGame);

function startGame() {
  removePlayBtnEvent();
  setGameTimer();
  createTileLists();
  //shuffle();
}

function removePlayBtnEvent() {
  playBtn.removeEventListener("click", startGame);
}

function setGameTimer() {
  startGameTimer = setInterval(() => {
    ++initTime;
    let seconds = initTime % 60;
    let minutes = Math.floor((initTime / 60) % 60);
    let hours = Math.floor((initTime / 3600) % 60);

    hour = hours < 10 ? "0" + hours : hours;
    min = minutes < 10 ? "0" + minutes : minutes;
    sec = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `Time - ${hour}:${min}:${sec}`;
  }, 1000);
  // clearInterval(setGameTimer);
}

function createTileLists() {
  let c = 1;
  for (let i = 1; i <= TILENUMBER; i++) {
    if (i <= TILENUMBER / 3) {
      let r = 1;
      ul.innerHTML += `<li id="cell${r}${c}" class="tile${i}" onClick="clickTile(${r},${c});"></li>`;
    } else if (i > 3 && i <= 6) {
      r = 2;
      ul.innerHTML += `<li id="cell${r}${
        c - 3
      }" class="tile${i}" onClick="clickTile(${r},${c - 3});"></li>`;
    } else if (i > 6 && i <= 9) {
      r = 3;
      ul.innerHTML += `<li id="cell${r}${
        c - 6
      }" class="tile${i}" onClick="clickTile(${r},${c - 6});"></li>`;
    }
    c++;
  }
}

function displayMoveMentNumber(numberChange) {
  numberChange;
  swapCount = movementCount - TILENUMBER;
  movement.innerHTML = `Movement : ${swapCount}`;
}
///////////////////////////////////////////////////////
// <li id="cell11" class="tile1" onClick="clickTile(1,1);"></li>
// <li id="cell12" class="tile2" onClick="clickTile(1,2);"></li>
// <li id="cell13" class="tile3" onClick="clickTile(1,3);"></li>
// <li id="cell21" class="tile4" onClick="clickTile(2,1);"></li>
// <li id="cell22" class="tile5" onClick="clickTile(2,2);"></li>
// <li id="cell23" class="tile6" onClick="clickTile(2,3);"></li>
// <li id="cell31" class="tile7" onClick="clickTile(3,1);"></li>
// <li id="cell32" class="tile8" onClick="clickTile(3,2);"></li>
// <li id="cell33" class="tile9" onClick="clickTile(3,3);"></li>
////////////////////////////////////////////////////////
function shuffle() {
  movementCount = 0;
  for (let row = 1; row <= 3; row++) {
    for (let column = 1; column <= 3; column++) {
      let row2 = Math.floor(Math.random() * 3 + 1);
      let column2 = Math.floor(Math.random() * 3 + 1);
      swapTiles("cell" + row + column, "cell" + row2 + column2);
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

function swapTiles(cell1, cell2, doOrUndo) {
  document.getElementById(cell1);
  let temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(
    cell2
  ).className;
  document.getElementById(cell2).className = temp;
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

function checkSolution() {
  checkTileNum = 0;
  for (let i = 1; i <= TILENUMBER; i++) {
    let tileClassName = document.querySelectorAll("li")[`${i - 1}`].className;
    let tileNumber = `tile${i}`;
    console.log(tileNumber);
    if (tileClassName === tileNumber) {
      checkTileNum++;
      console.log(checkTileNum);
      if (checkTileNum === 9) {
        displayPopUp("Good Job ! 👍");
      }
    }
  }
}

function displayPopUp(message) {
  popUp.style.visibility = "visible";
  popUpMessage.innerHTML = `${message}`;
}

function replayGame() {}

// 난이도 바꾸기
