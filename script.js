const gameContainer = document.getElementById("game");
const reloadButton = document.querySelector("#buttonReload");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");
const input = document.querySelector("input");
const score = document.querySelector(".currentscore");
const colors = [];
const bestScore = document.querySelector(".bestscore");
let localStorageScores = JSON.parse(localStorage.getItem("savedScores")) || [];
if (localStorageScores.length !== 0) {
  bestScore.innerText = localStorageScores.reduce((max, num) => {
    return Math.max(max, num);
  });
}
// Make a random color and push to colors array based on user input
function cardColorMaker(num) {
  for (let i = 0; i < num; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    colors.push(`rgb(${r},${g},${b})`);
    colors.push(`rgb(${r},${g},${b})`);
  }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

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
// makes game tiles based on user input
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userNum = parseInt(input.value);
  cardColorMaker(userNum);
  winScore = parseInt(input.value) * 2;
  startGame();
});
function startGame() {
  let shuffledColors = shuffle(colors);
  console.log(shuffledColors);
  createDivsForColors(shuffledColors);
  form.remove();
}

let firstCard = "";
let secondCard = "";
let gamepoints = 0;
let winScore = 0;
// reset code

function reset() {
  firstCard = "";
  secondCard = "";
}

function handleCardClick(e) {
  if (firstCard === "") {
    e.target.style.backgroundColor = e.target.className;
    firstCard = e.target;
  } else {
    e.target.style.backgroundColor = e.target.className;
    secondCard = e.target;
  }
  if (firstCard !== "" && secondCard !== "") {
    if (firstCard.className !== secondCard.className) {
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        reset();
      }, 1000);
    } else {
      reset();
      gamepoints += 2;
      score.innerText = gamepoints;
    }
  }
  if (gamepoints === winScore) {
    win();
    localStorageSave(parseInt(gamepoints));
  }
}

reloadButton.addEventListener("click", function () {
  location.reload();
});

function win() {
  const winBanner = document.querySelector("#winBanner");
  const winningText = document.createElement("h2");
  winningText.innerText = "Yay!! You Won!";
  winBanner.id = "win";
  winBanner.appendChild(winningText);
}
function localStorageSave(score) {
  localStorageScores.push(score);
  const scores = JSON.stringify(localStorageScores);
  localStorage.setItem("savedScores", scores);
}
