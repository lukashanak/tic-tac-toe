// DOM elements
const PLAYER_ONE_SCORE = document.getElementById("playerOne_score");
const GAME_NUMBER = document.getElementById("game_number");
const PLAYER_TWO_SCORE = document.getElementById("playerTwo_score");

function increaseScore(whichScore) {
  whichScore.innerHTML = parseInt(whichScore.innerHTML)+1;
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

  increaseOrDecreaseByOne(["row"+rowIndex]);
  increaseOrDecreaseByOne(["col"+colIndex]);

  if (cellID == 0 || cellID == 4 || cellID == 8) {
    increaseOrDecreaseByOne("diag0");
  }
  if (cellID == 2 || cellID == 4 || cellID == 6) {
    increaseOrDecreaseByOne("diag1");
  }
}

function increaseOrDecreaseNumberByOne(property)  {
  if (isPlayerOneMoving === true) {
      boardInfo[property]+=1;
      console.log("increased");
  }
  else {
    boardInfo[property]-=1;
  }
}



//
function isItWin() {
  for (var key in boardInfo) {
    if (boardInfo.hasOwnProperty(key)) {
        if (boardInfo[key] == 3) {
          return true;
        }
    }
}
}


function makeMove(cellID) {
  if (document.getElementById(cellID).innerHTML !== "") {
    console.log("cell is not empty");
    return 0;
  }
  else {
    let X = '<i class="fa fa-times" aria-hidden="true"></i>';
    let O = '<span>O</span>';

    // WHEN THE FIRST PLAYER IS ON THE MOVE
    if (isPlayerOneMoving === true) {
      document.getElementById(cellID).innerHTML = X;
      updateBoardInfo(cellID);
      if (isItWin() === true) {
        increaseScore(PLAYER_ONE_SCORE);
        increaseScore(GAME_NUMBER);
        setTimeout(function() {
            resetGamingBoard();
        }, 2000);
        return;
      }
      switchPlayer();

      /*
      if (singlePlayerMode === true) {
        makeComputerMove();activePlayer()
      }
      */
    }

    // WHEN THE SECOND PLAYER IS ON THE MOVE
    else if (isPlayerOneMoving === false) {
      document.getElementById(cellID).innerHTML = O;
      updateBoardInfo(cellID);
      if (isItWin() === true) {

        increaseScore(PLAYER_TWO_SCORE);
        increaseScore(GAME_NUMBER);
        setTimeout(function() {
            resetGamingBoard();
        }, 2000);
        return;
      }
      switchPlayer();
    }

  }
}


function isCellEmpty(cellID) {
  return document.getElementById(cellID).innerHTML !== "";
}

function markCell(cellID){
  let X = '<i class="fa fa-times" aria-hidden="true"></i>';
  let O = '<span>O</span>';

  document.getElementById(cellID).innerHTML;
}

function makeMovee(cellID) {
  if (isCellEmpty(cellID) == false) { return; }
  if (isPlayerOneMoving === true) {
     document.getElementById(cellID).innerHTML;
  }
  else {

  }
}



function resetGamingBoard() {
  for (var i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].innerHTML="";
  }

  for (var key in player1) {
    if (player1.hasOwnProperty(key)) {
        player1[key] = 0;
    }
  }

  for (var key in player2) {
    if (player2.hasOwnProperty(key)) {
        player2[key] = 0;
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

}


/*
function blinkingAnimation(className) {
  let element = document.getElementsByClassName(className);
  console.log(element.length);
  // element.classList.add("hide-element");
}
*/
