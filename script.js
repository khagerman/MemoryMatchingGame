const gameContainer = document.getElementById("game");
const button = document.querySelector("button");
const COLORS = [
  "#ff99c8",
  "#c0fdff",
  "#ccfccb",
  "#fdffb6",
  "#deaaff",
  "#ff99c8",
  "#c0fdff",
  "#ccfccb",
  "#fdffb6",
  "#deaaff",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let firstColor = "";
let secondColor = "";
let firstCard = "";
let secondCard = "";
let gamepoints = 0;

// reset code

function reset() {
  firstColor = "";
  secondColor = "";
  firstCard = "";
  secondCard = "";
}

function handleCardClick(e) {
  if (firstColor === "") {
    e.target.style.backgroundColor = e.target.className;
    firstColor = e.target.className;
    firstCard = e.target;
  } else {
    e.target.style.backgroundColor = e.target.className;
    secondColor = e.target.className;
    secondCard = e.target;
  }
  if (firstColor !== "" && secondColor !== "") {
    if (firstColor !== secondColor) {
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        reset();
      }, 1000);
    } else {
      reset();
      gamepoints += 2;
    }
  }
  if (gamepoints === 10) {
    alert("Yay!! You Won!");
  }
}

createDivsForColors(shuffledColors);
button.addEventListener("click", function () {
  location.reload();
});
