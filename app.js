


/*
function blinkingAnimation(className) {
  let element = document.getElementsByClassName(className);
  console.log(element.length);
  // element.classList.add("hide-element");
}
*/

function writeXorO(elementID) {
  let X = '<i class="fa fa-times" aria-hidden="true"></i>';
  let O = '<span>O</span>';
  let XorO = "O";

if (document.getElementById(elementID).innerHTML !== "") {
  console.log("cell not empty!");
}
else {
  if (XorO == "X") {
      document.getElementById(elementID).innerHTML = X;
  }
  if (XorO == "O") {
    document.getElementById(elementID).innerHTML = O;
  }
}
}

window.onload = function() {
  writeXorO("2");

  const allGamingCells = document.getElementsByClassName("gaming-cell");
  for (let i = 0; i < allGamingCells.length; i++) {
      allGamingCells[i].addEventListener('click', () => {
         writeXorO(allGamingCells[i].id);
      })
  }
}
