
const choiceButtons = document.querySelectorAll(".choice");
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const statusElement = document.getElementById("status");
const playerMoveElement = document.getElementById("playerMove");
const computerMoveElement = document.getElementById("computerMove");
const roundCountElement = document.getElementById("roundCount");
const resetBtn = document.getElementById("resetBtn");

const choices = ["rock", "paper", "scissors"];

const emojis = {
    rock: "✊ Rock",
    paper: "✋ Paper",
    scissors: "✌️ Scissors"
};

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

function playGame(playerChoice) {
    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    roundsPlayed++;

    playerMoveElement.textContent = emojis[playerChoice];
    computerMoveElement.textContent = emojis[computerChoice];

    if (playerChoice === computerChoice) {
        statusElement.textContent = "🤝 It's a Draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        statusElement.textContent = "🎉 You Win!";
    } else {
        computerScore++;
        statusElement.textContent = "💻 Computer Wins!";
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    roundCountElement.textContent = `Rounds played: ${roundsPlayed}`;
}

choiceButtons.forEach(button => {
    button.addEventListener("click", function () {
        playGame(this.dataset.choice);
    });
});

resetBtn.addEventListener("click", function () {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;

    playerMoveElement.textContent = "—";
    computerMoveElement.textContent = "—";
    statusElement.textContent = "Make your first move!";

    playerScoreElement.textContent = "0";
    computerScoreElement.textContent = "0";
    roundCountElement.textContent = "Rounds played: 0";
});
.choice {
    cursor: pointer;
    pointer-events: auto;
    position: relative;
    z-index: 10;
}

.choices {
    position: relative;
    z-index: 10;
}

button {
    pointer-events: auto;
}
