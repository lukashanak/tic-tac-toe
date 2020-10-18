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

/*
0 X X X
1
2
*/



function checkRowWinner(positionID) {
  let parent = document.getElementById(positionID).parentElement;
  if (parent.children[0].innerHTML == parent.children[1].innerHTML && parent.children[0].innerHTML == parent.children[2].innerHTML) {
    console.log("SOMEONE WON!");
  }
}


function checkColumnlWinner(positionID) {
var getRowPosition;
var getColPosition;

var rowArr = [];
var colArr = [];

var row1 = document.getElementById("gaming-table").children[0].children[0];
var row2 = document.getElementById("gaming-table").children[0].children[1];
var row3 = document.getElementById("gaming-table").children[0].children[2];

console.log(row1.children[0].innerHTML);

}

checkColumnlWinner("0");

function checkWin() {

}

function isItDraw() {

}

function resetGamingBoard() {
  for (var i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].innerHTML="";
  }
}

// make a move, based on the position of the <td> by ID
var isPlayerOneMoving = true; // or 'O'

function makeMove(positionID) {

  if (document.getElementById(positionID).innerHTML !== "") {
    console.log("cell is not empty");
    return 0;
  }

  else {
    let X = '<i class="fa fa-times" aria-hidden="true"></i>';
    let O = '<span>O</span>';

    if (isPlayerOneMoving === true) {
      document.getElementById(positionID).innerHTML = X;
      checkRowWinner(positionID);
      isPlayerOneMoving = false;
      if (singlePlayerMode === true) {
        makeComputerMove();
      }
    }

    else if (isPlayerOneMoving === false) {
      document.getElementById(positionID).innerHTML = O;
      checkRowWinner(positionID);
      isPlayerOneMoving = true;
    }

    else {
      console.log("start a new game");
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
