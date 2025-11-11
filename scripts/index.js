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

const addWordToDom = (array) => {
  let newWord;

  // Keep picking until we get a different word
  do {
    newWord = array[Math.floor(Math.random() * array.length)];
  } while (newWord === randomWord && array.length > 1);

  randomWord = newWord;
  word.innerHTML = randomWord;
};

// Start the game
addWordToDom(words);

//Initializing score
let score = 0;

text.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const userInput = this.value;
    this.value = "";

    updateScore(randomWord, userInput);
  }
});

const updateScore = (word, userInput) => {
  if (word === userInput) {
    score++;
    scoreEl.innerText = score;

    // Add bonus time
    time += 5;

    // Generate and display new word
    addWordToDom(words);
  }
};

//Initializing time
let time = 10;

const updateTime = () => {
  time--;
  timeEl.innerHTML = time;
  if (time === 0) {
    clearInterval(timer);
    gameOver();
  }
};

const timer = setInterval(updateTime, 1000);

// Game Over
const gameOver = () => {
  endgameEl.style.display = "flex";
  const endHeader = document.createElement("h1");
  endHeader.textContent = "Game Over!";
  endgameEl.append(endHeader);
  const endMessage = document.createElement("p");
  endMessage.textContent = "Your final score is: " + score;
  endgameEl.append(endMessage);
};
