// 33 버튼 이벤트
// 사진 분할 -> display , 타이머 동작

const threeBtn = document.querySelector(".threeBythree");

const timer = document.querySelector(".timer");

// timer 변수 선언
let initTime = 0;
let startGameTimer;

function setGame() {
  setThreeByThreeBtn();
}

function setThreeByThreeBtn() {
  threeBtn.addEventListener("click", () => {
    dividePhoto();
    setPhotoPieces();
    setGameTimer();
  });
}

function dividePhoto() {}

function setPhotoPieces() {}

function setGameTimer() {
  startGameTimer = setInterval(() => {
    ++initTime;
    let seconds = time % 60;
    let minutes = Math.floor((initTime / 60) % 60);
    let hours = Math.floor((initTime / 3600) % 60);

    hour = hours < 10 ? "0" + hours : hours;
    min = minutes < 10 ? "0" + minutes : minutes;
    sec = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `${hour}:${min}:${sec}`;
  }, 1000);
}
// clearInterval(setGameTimer);
