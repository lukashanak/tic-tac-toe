

/*
function blinkingAnimation(className) {
  let element = document.getElementsByClassName(className);
  console.log(element.length);
  // element.classList.add("hide-element");
}
*/

writeXorO("2");
const allGamingCells = document.getElementsByClassName("gaming-cell");
for (let i = 0; i < allGamingCells.length; i++) {
    allGamingCells[i].addEventListener('click', () => {
       writeXorO(allGamingCells[i].id);
       console.log("pica");
    })
}

var XorO = "X";
const PLAYER_ONE_SCORE = document.getElementById("playerOne_score");
const GAME_NUMBER = document.getElementById("game_number");
const PLAYER_TWO_SCORE = document.getElementById("playerTwo_score");

function increaseScore(whichScore) {
  whichScore.innerHTML = parseInt(whichScore.innerHTML)+1;
}


  function writeXorO(elementID) {
    let X = '<i class="fa fa-times" aria-hidden="true"></i>';
    let O = '<span>O</span>';

  if (document.getElementById(elementID).innerHTML !== "") {
    console.log("cell is not empty");
  }
  else {
    if (XorO == "X") {
        document.getElementById(elementID).innerHTML = X;
        XorO = "O";
    }
    else if (XorO == "O") {
      document.getElementById(elementID).innerHTML = O;
      XorO = "X";
    }
    else {
      console.log("start a new game");
    }
  }
  }
