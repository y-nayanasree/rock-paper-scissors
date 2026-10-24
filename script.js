const choiceButtons = document.querySelectorAll(".choice");
const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const resetBtn = document.getElementById("resetBtn");

const countdownElement = document.getElementById("countdown");
const statusElement = document.getElementById("status");
const playerMoveElement = document.getElementById("playerMove");
const computerMoveElement = document.getElementById("computerMove");
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const roundCountElement = document.getElementById("roundCount");

const choices = ["rock", "paper", "scissors"];

const emoji = {
    rock: "✊ Rock",
    paper: "✋ Paper",
    scissors: "✌️ Scissors"
};

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let gameReady = false;
let gameRunning = false;
let countdownTimer;

function setChoicesEnabled(enabled) {
    choiceButtons.forEach(button => {
        button.disabled = !enabled;
    });
}

function startGame() {
    if (gameRunning) return;

    clearInterval(countdownTimer);

    gameRunning = true;
    gameReady = false;
    setChoicesEnabled(false);

    startBtn.disabled = true;
    playAgainBtn.disabled = true;

    playerMoveElement.textContent = "❔";
    computerMoveElement.textContent = "❔";
    statusElement.textContent = "Get ready!";
    
    let count = 3;
    countdownElement.textContent = count;

    countdownTimer = setInterval(() => {
        count--;

        if (count > 0) {
            countdownElement.textContent = count;
        } else {
            clearInterval(countdownTimer);
            countdownElement.textContent = "Choose NOW! 🎮";
            statusElement.textContent = "Select Rock, Paper or Scissors!";
            gameReady = true;
            setChoicesEnabled(true);
        }
    }, 1000);
}

function playRound(playerChoice) {
    if (!gameReady || !gameRunning) return;

    gameReady = false;
    setChoicesEnabled(false);

    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    roundsPlayed++;

    playerMoveElement.textContent = emoji[playerChoice];
    computerMoveElement.textContent = emoji[computerChoice];

    if (playerChoice === computerChoice) {
        statusElement.textContent = "🤝 It's a Draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        statusElement.textContent = "🎉 You Win This Round!";
    } else {
        computerScore++;
        statusElement.textContent = "💻 Computer Wins This Round!";
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    roundCountElement.textContent = `Rounds played: ${roundsPlayed}`;

    countdownElement.textContent = "Round complete!";
    gameRunning = false;
    startBtn.disabled = false;
    playAgainBtn.disabled = false;
}

choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        playRound(button.dataset.choice);
    });
});

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

resetBtn.addEventListener("click", () => {
    clearInterval(countdownTimer);

    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    gameReady = false;
    gameRunning = false;

    playerScoreElement.textContent = "0";
    computerScoreElement.textContent = "0";
    roundCountElement.textContent = "Rounds played: 0";

    playerMoveElement.textContent = "❔";
    computerMoveElement.textContent = "❔";
    statusElement.textContent = "Your game starts here!";
    countdownElement.textContent = "Click Start Game!";

    setChoicesEnabled(false);
    startBtn.disabled = false;
    playAgainBtn.disabled = true;
});
