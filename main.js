const threeBtn = document.querySelector(".threeBythree");
const playBtn = document.querySelector(".playBtn");
const shuffleBtn = document.querySelector(".shuffleBtn");
const photoChangeBtn = document.querySelector(".photoChangeBtn");

const timer = document.querySelector(".timer");
const movement = document.querySelector(".movement");
const originalPhoto = document.querySelector(".originalPhoto");

let initTime = 0;
let startGameTimer;
let movementCount = 0;
let TILENUMBER = 9;

var addPlayBtnEvent = playBtn.addEventListener("click", startGame);
var addShuffleBtnEvent = shuffleBtn.addEventListener("click", shuffle);
var addPhotoChangeBtnEvent = photoChangeBtn.addEventListener(
  "click",
  changePhoto
);

function startGame() {
  removePlayBtnEvent();
  setGameTimer();
  shuffle();
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

function shuffle() {
  movementCount = 0;
  //Use nested loops to access each cell of the 3x3 grid
  for (let row = 1; row <= 3; row++) {
    //For each row of the 3x3 grid
    for (let column = 1; column <= 3; column++) {
      //For each column in this row

      let row2 = Math.floor(Math.random() * 3 + 1); //Pick a random row from 1 to 3
      let column2 = Math.floor(Math.random() * 3 + 1); //Pick a random column from 1 to 3

      swapTiles("cell" + row + column, "cell" + row2 + column2); //Swap the look & feel of both cells
    }
  }
}

function swapTiles(cell1, cell2) {
  let temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(
    cell2
  ).className;
  document.getElementById(cell2).className = temp;
  ++movementCount;
  let swapCount = movementCount - TILENUMBER;
  movement.innerHTML = `Movement : ${swapCount}`;
}

function clickTile(row, column) {
  let cell = document.getElementById("cell" + row + column);
  let tile = cell.className;
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
  if (tileMap.empty.position !== 9) return false;

  for (var key in tileMap) {
    if (key != 1 && key != "empty") {
      if (tileMap[key].position < tileMap[key - 1].position) return false;
    }
  }

  // Clear history if solved
  history = [];
  return true;
}

function changePhoto() {
  originalPhoto.alt === "game1" ? changeTiles(2) : changeTiles(1);
}

function changeTiles(photoNum) {
  for (let i = 1; i < TILENUMBER + 1; i++) {
    const tiles = document.querySelector(`.tile${i}`);
    tiles.style.backgroundImage =
      "url('" + "imgs/game" + photoNum + ".png" + "')";
    if (i === 9) {
      tiles.style.background = "white";
    }
  }
  originalPhoto.src = `imgs/game${photoNum}.png`;
  originalPhoto.alt = `game${photoNum}`;
}

// 게임 끝남
// 난이도 바꾸기
