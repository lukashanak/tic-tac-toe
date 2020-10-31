// ADD EVENT LISTENERS ON EVERY CELL ON THE BOARD
const allGamingCells = document.getElementsByClassName("gaming-cell");
for (let i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].addEventListener('click', () => {
       makeMove(allGamingCells[i].id);
    })
}

// DOM ELEMENTS - STATISCTICS
const PLAYER_ONE_SCORE = document.getElementById("playerOne_score");
const GAME_NUMBER = document.getElementById("game_number");
const PLAYER_TWO_SCORE = document.getElementById("playerTwo_score");

// UPDATE STATISTICS - BASED ON WHICH PLAYER IS MOVING
function updateStatistics() {
  if (isPlayerOneMoving === true) { PLAYER_ONE_SCORE.innerHTML = parseInt(PLAYER_ONE_SCORE.innerHTML)+1; }
  else { PLAYER_TWO_SCORE.innerHTML = parseInt(PLAYER_TWO_SCORE.innerHTML)+1;}
  GAME_NUMBER.innerHTML = parseInt(GAME_NUMBER.innerHTML)+1;
}

// GET INFO ABOUT WHO IS CURRENTLY PLAYING AND SWITCH IT IF NEEDED
let isPlayerOneMoving = true;
let isPlayerTwoMoving = false;
function switchPlayer() {
  isPlayerOneMoving = !isPlayerOneMoving;
  isPlayerTwoMoving = !isPlayerTwoMoving;
}


// BOARD INFO - USED FOR DETERMINING IF THERE IS A WINNER
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

// DETERMINE IF THERE IS A WINNER
function isItWin() {
  for (let key in boardInfo) {
    if (boardInfo.hasOwnProperty(key)) {
        if (boardInfo[key] == 3 || boardInfo[key] == -3) {
          return true;
        }
    }
}
}

function isItDraw(){
  isEveryCellFull = true;
  for (let i = 0; i < allGamingCells.length; i++) {
    if (allGamingCells[i].innerHTML == "")
    isEveryCellFull = false;
  }
  return isEveryCellFull;
}

// UPDATE THE STATE OF THE BOARDINFO OBJECT
function updateBoardInfo(cellID) {
  let rowIndex = document.getElementById(cellID).closest('tr').rowIndex;
  let colIndex = document.getElementById(cellID).cellIndex;

  plusOrMinusOnObject('row'+rowIndex);
  plusOrMinusOnObject('col'+colIndex);

  if (cellID == 0 || cellID == 4 || cellID == 8) { plusOrMinusOnObject("diag0") }
  if (cellID == 2 || cellID == 4 || cellID == 6) { plusOrMinusOnObject("diag1") }
}

// ADD ONE OR SUBSTRACT 1 FROM THE OBJECT PROPERTY, BASED ON ACTIVE PLAYER
function plusOrMinusOnObject(property)  {
  if (isPlayerOneMoving === true) {
     boardInfo[property]+=1;
    }
  else {
     boardInfo[property]-=1;
    }
}

// GET INFO IF THE CELL IS EMPTY
function isCellEmpty(cellID) {
  return document.getElementById(cellID).innerHTML == "";
}

// MARK THE CELL WITH X OR O, BASED ON THE CURRENTLY MOVING PLAYER
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

// MAKE A MOVE - WHEN THE USER CLICK TO THE CELL
function makeMove(cellID) {
  if (isCellEmpty(cellID) == false) { return }
  if (suspendedGame == true) { return }
     markCell(cellID);
     updateBoardInfo(cellID);
     if (isItWin() === true) {
       updateBoardInfo(cellID);
       updateStatistics();
       suspendedGame = true;
       setTimeout(function() {
           resetGamingBoard();
           suspendedGame = false;
       }, 2000);
       return;
     }
     if(isItDraw() === true) { return }
     switchPlayer();

     if (singlePlayerMode === true && isPlayerTwoMoving === true) {
       setTimeout(function(){
        makeMove(getIdOfNotUsedCell());
      },100);
     }

}

// GENERATE RANDOM ID OF NOT USED CELL
function getIdOfNotUsedCell(){
  let randomCellId = (Math.random() * 8).toFixed(0);
  while (document.getElementById(randomCellId).innerHTML !== "") {
    randomCellId = (Math.random() * 8).toFixed(0);
  }
  return randomCellId;
}

function makeComputerMove() {
  let randomNumber = (Math.random() * 8).toFixed(0);
  while(markCell(randomNumber) == 0) {
    randomNumber = (Math.random() * 8).toFixed(0);
  }
}

function resetGamingBoard() {
  isPlayerOneMoving = true;
  isPlayerTwoMoving = false;
  for (var i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].innerHTML="";
  }

  for (var key in boardInfo) {
    if (boardInfo.hasOwnProperty(key)) {
        boardInfo[key] = 0;
    }
  }
}


var singlePlayerMode = true;
function switchMode() {
  singlePlayerMode = !singlePlayerMode;
}

/*
function blinkingAnimation(className) {
  let element = document.getElementsByClassName(className);
  console.log(element.length);
  // element.classList.add("hide-element");
}
*/
