// DOM elements
const PLAYER_ONE_SCORE = document.getElementById("playerOne_score");
const GAME_NUMBER = document.getElementById("game_number");
const PLAYER_TWO_SCORE = document.getElementById("playerTwo_score");

// event listener on every cell on the board
const allGamingCells = document.getElementsByClassName("gaming-cell");
for (let i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].addEventListener('click', () => {
       makeMove(allGamingCells[i].id);
    })
}


// make a move, based on the position of the <td> by ID
var isPlayerOneMoving = true; // or 'O'
function makeMove(positionID) {
  let X = '<i class="fa fa-times" aria-hidden="true"></i>';
  let O = '<span>O</span>';

  if (document.getElementById(positionID).innerHTML !== "") {
    console.log("cell is not empty");
    return 0;
  }
  else {
    if (isPlayerOneMoving === true) {
      document.getElementById(positionID).innerHTML = X;
      isPlayerOneMoving = false;
    }
    else if (isPlayerOneMoving === false) {
      document.getElementById(positionID).innerHTML = O;
      isPlayerOneMoving = true;
    }
    else {
      console.log("start a new game");
    }
  }
}


// sub functions

function increaseScore(whichScore) {
  whichScore.innerHTML = parseInt(whichScore.innerHTML)+1;
}

function makeComputerMove() {
  let randomNumber = (Math.random() * 8).toFixed(0);
  while(makeMove(randomNumber) == 0) {
      randomNumber = (Math.random() * 8).toFixed(0);
  }
}



var mode = 'singleplayer'; // or 'multiplayer, if the user switch'

function switchMode() {

}


/*
function blinkingAnimation(className) {
  let element = document.getElementsByClassName(className);
  console.log(element.length);
  // element.classList.add("hide-element");
}
*/
