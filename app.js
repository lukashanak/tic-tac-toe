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
    //   console.log("Row index: " + allGamingCells[i].closest('tr').rowIndex );
    })
}

// make a move, based on the position of the <td> by ID
var isPlayerOneMoving = true; // or 'O'

function switchPlayer() {
  if (isPlayerOneMoving === true) {
    isPlayerOneMoving = false;
  }
  else {
    isPlayerOneMoving = true;
  }
}

// board info - player1
var player1 = {
  row1: 0,
  row2: 0,
  row3: 0,
  col1: 0,
  col2: 0,
  col3: 0,
  diag0: 0,
  diag1: 0,
}

// board info - player1
var player2 = {
  row1: 0,
  row2: 0,
  row3: 0,
  col1: 0,
  col2: 0,
  col3: 0,
  diag0: 0,
  diag1: 0,
}

function updateBoardInfo(player, cellID) {
  var rowNumber = document.getElementById(cellID).closest('tr').rowIndex;
  var colNumber = document.getElementById(cellID).cellIndex;
  console.log("row number is " + rowNumber);
  console.log("col numer is " +colNumber);
}

function isItWin(player) {
  for (var key in player) {
    if (player.hasOwnProperty(key)) {
        if (player[key] == 3) {
          console.log("WIN!");
        }
    }
}
}


function makeMove(positionID) {
  if (document.getElementById(positionID).innerHTML !== "") {
    console.log("cell is not empty");
    return 0;
  }
  else {
    let X = '<i class="fa fa-times" aria-hidden="true"></i>';
    let O = '<span>O</span>';

    // WHEN THE FIRST PLAYER IS ON THE MOVE
    if (isPlayerOneMoving === true) {
      document.getElementById(positionID).innerHTML = X;
      updateBoardInfo(player1, positionID);
      switchPlayer();

      /*
      if (singlePlayerMode === true) {
        makeComputerMove();
      }
      */
    }

    // WHEN THE SECOND PLAYER IS ON THE MOVE
    else if (isPlayerOneMoving === false) {
      document.getElementById(positionID).innerHTML = O;
      updateBoardInfo(player1, positionID);
      switchPlayer(player2);
    }

  }
}



function resetGamingBoard() {
  for (var i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].innerHTML="";
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
