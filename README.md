## Sliding-Puzzle

### 추억의 사진 퍼즐 게임입니다.

#### 기능
- Shuffle => 랜덤으로 각 퍼즐에 좌표부여 (Math.floor/ Math.random())
- Undo => 배열로 동작 히스토리 관리 (array.slice()/ array.pop()/ array.push())
- 3x3/4x4/5x5 => 각 퍼즐 개수에 따라 이미지 나누기 (parseInt(event.target.id.charAt(0))/)
- Time => 게임 상황에 따라 타이머 동작/멈추기 (setInterval()/ clearInterval()/ Math.floor)
- PopUp => 게임 종료 시 배너 & 리플레이 버튼 전시 (popUp.style.visibility/ popUpMessage.innerHTML)

#### 게임 플레이 이미지
![sliding-puzzle](https://user-images.githubusercontent.com/67942048/96875860-ae8ad380-14b2-11eb-9593-ad4cdca0ea9f.gif)

#### 게임 종료 시 이미지
![sliding puzzle complete](https://user-images.githubusercontent.com/67942048/96876361-51dbe880-14b3-11eb-9bb5-c050ca7dc04a.png)

