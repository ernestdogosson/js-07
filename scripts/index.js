// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

function addWordToDom(array) {
  randomWord = array[Math.floor(Math.random() * array.length)];

  return randomWord;
}

addWordToDom(words);
document.getElementById("word").innerHTML = randomWord;

//Initializing score
let score = 0;

const input = document.getElementById("text");
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const userInput = this.value;
    this.value = "";

    updateScore(randomWord, userInput); // Use userinput within function
  }
});

function updateScore(word, userInput) {
  if (word === userInput) {
    score += 1;
    document.getElementById("score").innerHTML = score;
  }
}

//Initializing time
let time = 10;
