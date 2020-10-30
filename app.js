// DOM elements
const PLAYER_ONE_SCORE = document.getElementById("playerOne_score");
const GAME_NUMBER = document.getElementById("game_number");
const PLAYER_TWO_SCORE = document.getElementById("playerTwo_score");

function updateStatistics() {
  if (isPlayerOneMoving === true) { PLAYER_ONE_SCORE.innerHTML = parseInt(PLAYER_ONE_SCORE.innerHTML)+1; }
  else { PLAYER_TWO_SCORE.innerHTML = parseInt(PLAYER_TWO_SCORE.innerHTML)+1;}
  GAME_NUMBER.innerHTML = parseInt(GAME_NUMBER.innerHTML)+1;
}

// event listener on every cell on the board
const allGamingCells = document.getElementsByClassName("gaming-cell");
for (let i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].addEventListener('click', () => {
       makeMove(allGamingCells[i].id);
    })
}

// get info about who is currently playing and switch it if needed
let isPlayerOneMoving = true;
let isPlayerTwoMoving = false;
function switchPlayer() {
  if (isPlayerOneMoving === true) {
    isPlayerOneMoving = false;
    isPlayerTwoMoving = true
  }
  else {
    isPlayerOneMoving = true;
    isPlayerTwoMoving = false;
  }
}


// track board info and update it when needed
let boardInfo = {
  row0: 0,
  row1: 0,
  row2: 0,
  col0: 0,
  col1: 0,
  col2: 0,
  diag0: 0,
  diag1: 0
}


// I hate these two functions, they are messy
function updateBoardInfo(cellID) {
  var rowIndex = document.getElementById(cellID).closest('tr').rowIndex;
  var colIndex = document.getElementById(cellID).cellIndex;

  increaseOrDecreaseNumberByOne(["row"+rowIndex]);
  increaseOrDecreaseNumberByOne(["col"+colIndex]);

  if (cellID == 0 || cellID == 4 || cellID == 8) {
    increaseOrDecreaseNumberByOne("diag0");
  }
  if (cellID == 2 || cellID == 4 || cellID == 6) {
    increaseOrDecreaseNumberByOne("diag1");
  }
}

function increaseOrDecreaseNumberByOne(property)  {
  if (isPlayerOneMoving === true) {
      boardInfo[property]+=1;
  }
  else {
    boardInfo[property]-=1;
  }
}


function isItWin() {
  for (let key in boardInfo) {
    if (boardInfo.hasOwnProperty(key)) {
        if (boardInfo[key] == 3 || boardInfo[key] == -3) {
          return true;
        }
    }
}
}

function isCellEmpty(cellID) {
  return document.getElementById(cellID).innerHTML == "";
}

function markCell(cellID){
  let playerOneChar = '<i class="fa fa-times" aria-hidden="true"></i>';
  let playerTwoChar = '<span>O</span>';

  if (isPlayerOneMoving === true) {
    document.getElementById(cellID).innerHTML = playerOneChar;
  }
  else {
    document.getElementById(cellID).innerHTML = playerTwoChar;
  }
}

let suspendedGame = false;

function makeMove(cellID) {
  if (isCellEmpty(cellID) == false) { return }
  if (suspendedGame == true) { return }

  if (isPlayerOneMoving === true) {
     markCell(cellID);
     updateBoardInfo(cellID);
     if (isItWin() === true) {
       console.log("player one won!");
       updateBoardInfo(cellID);
       updateStatistics();
       suspendedGame = true;
       setTimeout(function() {
           resetGamingBoard();
           suspendedGame = false;
       }, 2000);
       return;
     }
     switchPlayer();
  }
  else {
    markCell(cellID);
    updateBoardInfo(cellID);
    if (isItWin() === true) {
      console.log("player two won!");
      updateBoardInfo(cellID);
      updateStatistics();
      suspendedGame = true;
      setTimeout(function() {
          resetGamingBoard();
          suspendedGame = false;
      }, 2000);
      return;
    }
    switchPlayer();
  }
}



function resetGamingBoard() {
  for (var i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].innerHTML="";
  }

  for (var key in boardInfo) {
    if (boardInfo.hasOwnProperty(key)) {
        boardInfo[key] = 0;
    }
  }

}


function makeComputerMove() {
  let randomNumber = (Math.random() * 8).toFixed(0);
  while(makeMove(randomNumber) == 0) {
    randomNumber = (Math.random() * 8).toFixed(0);
  }
}

var singlePlayerMode = false;
function switchMode() {
  singlePlayerMode = true;
}


/*
function blinkingAnimation(className) {
  let element = document.getElementsByClassName(className);
  console.log(element.length);
  // element.classList.add("hide-element");
}
*/
