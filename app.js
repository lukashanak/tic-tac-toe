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


var isPlayerOneMoving = true;
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
  row0: 0,
  row1: 0,
  row2: 0,
  col0: 0,
  col1: 0,
  col2: 0,
  diag0: 0,
  diag1: 0
}

// board info - player1
var player2 = {
  row0: 0,
  row1: 0,
  row2: 0,
  col0: 0,
  col1: 0,
  col2: 0,
  diag0: 0,
  diag1: 0
}

function updateBoardInfo(player, cellID) {
  var rowIndex = document.getElementById(cellID).closest('tr').rowIndex;
  var colIndex = document.getElementById(cellID).cellIndex;

  player["row"+rowIndex]+=1;
  player["col"+colIndex]+=1;

  if (cellID == 0 || cellID == 4 || cellID == 8) {
    player.diag0+=1;
    console.log(player.diag0);
  }
  if (cellID == 2 || cellID == 4 || cellID == 6) {
    player.diag1+=1;
    console.log(player.diag1);
  }
}

function isItWin(player) {
  for (var key in player) {
    if (player.hasOwnProperty(key)) {
        if (player[key] == 3) {
          return true;
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
      if (isItWin(player1) === true) {
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
      document.getElementById(positionID).innerHTML = O;
      updateBoardInfo(player2, positionID);
      if (isItWin(player2) === true) {

        increaseScore(PLAYER_TWO_SCORE);
        increaseScore(GAME_NUMBER);
        setTimeout(function() {
            resetGamingBoard();
        }, 2000);
        return;
      }
      switchPlayer(player2);
    }

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
