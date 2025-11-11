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

// Difficulty from localStorage or default to medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

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

//Initializing score
let score = 0;

//Initializing time based on difficulty
let timeValue;

const setTimeByDifficulty = (diff) => {
  if (diff === "easy") {
    timeValue = 10;
  } else if (diff === "medium") {
    timeValue = 7;
  } else {
    timeValue = 5;
  }
};

setTimeByDifficulty(difficulty);
let time = timeValue;
let timer;

const updateTime = () => {
  time--;
  timeEl.textContent = time;
  if (time === 0) {
    clearInterval(timer);
    gameOver();
  }
};

// Start timer function
const startTimer = () => {
  timer = setInterval(updateTime, 1000);
};

// Start the game
const startGame = () => {
  difficultySelect.value = difficulty; // Set saved difficulty
  settings.classList.add("hide"); // Hide settings
  addWordToDom(words);
  startTimer();
};

startGame();

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
    scoreEl.textContent = score;

    time += 5;

    addWordToDom(words);
  }
};

// Game Over
const gameOver = () => {
  endgameEl.style.display = "flex";

  // Game over header
  const endHeader = document.createElement("h1");
  endHeader.textContent = "Game Over!";
  endgameEl.append(endHeader);

  // Final score
  const endMessage = document.createElement("p");
  endMessage.textContent = `Your final score is: ${score}`;
  endgameEl.append(endMessage);

  // Restart button
  const restartGame = document.createElement("button");
  restartGame.textContent = "Restart";
  restartGame.className = "restart-btn";
  endgameEl.append(restartGame);

  // Restart function
  const restart = () => {
    score = 0;
    scoreEl.textContent = score;
    setTimeByDifficulty(difficulty);
    time = timeValue;
    timeEl.textContent = time;
    endgameEl.style.display = "none";
    endgameEl.innerHTML = "";
    text.value = "";
    text.focus();
    addWordToDom(words);
    startTimer();

    document.removeEventListener("keydown", handleKeyPress); // Remove keyboard listener after restart
  };

  // Keyboard event handler
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      restart();
    }
  };

  restartGame.addEventListener("click", restart); // Restart on click
  document.addEventListener("keydown", handleKeyPress); // Restart on Enter key
};

// Settings button - toggle settings display
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings form - change difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
