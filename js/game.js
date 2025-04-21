// Get DOM elements (make sure these IDs exist in your HTML)
const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");
const gameOverMessage = document.getElementById("gameOverMessage");
const startGameButton = document.getElementById("startGameButton");
const stopGameButton = document.getElementById("stopGameButton");

let score = 0;
let gameInterval = null;
let gameActive = false; // State flag

// --- Game State Management ---

function updateScore() {
  if (scoreBoard) scoreBoard.textContent = "Score: " + score;
}

export function resetGame() {
  if (!gameArea || !scoreBoard || !gameOverMessage || !startGameButton || !stopGameButton) {
    console.warn("One or more game elements not found during reset.");
    return;
  }
  score = 0;
  updateScore();
  gameOverMessage.textContent = "";
  gameOverMessage.classList.remove("visible");
  gameArea.innerHTML = ""; // Clear falling donuts

  // Reset button states
  startGameButton.textContent = "Start Game";
  startGameButton.disabled = false;
  stopGameButton.disabled = true;

  gameActive = false; // Ensure game is marked as inactive
  if (gameInterval) {
    clearInterval(gameInterval); // Clear any lingering interval
    gameInterval = null;
  }
  console.log("Game Reset.");
}

export function startGame() {
  if (gameActive || !gameArea) {
    console.log("Game already active or gameArea missing.");
    return; // Prevent starting multiple times or without area
  }

  // Clear existing donuts and message before starting
  if (gameArea) gameArea.innerHTML = "";
  if (gameOverMessage) {
    gameOverMessage.textContent = "";
    gameOverMessage.classList.remove("visible");
  }

  gameActive = true; // Set active flag
  score = 0; // Reset score
  updateScore();

  // Update button states for active game
  if (startGameButton) startGameButton.disabled = true;
  if (stopGameButton) stopGameButton.disabled = false;

  // Start spawning donuts
  if (gameInterval) clearInterval(gameInterval); // Clear just in case
  gameInterval = setInterval(createDonut, 1200); // Spawn rate (ms)
  console.log("Game Started.");
}

export function stopGame() {
  if (!gameActive) {
    console.log("Game not active, cannot stop.");
    return; // Only stop if active
  }

  gameActive = false; // Set inactive
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }

  // Reset button states after stopping
  if (startGameButton) {
    startGameButton.textContent = "Start Game";
    startGameButton.disabled = false;
  }
  if (stopGameButton) {
    stopGameButton.disabled = true;
  }
  console.log("Game Stopped.");
}

function gameOver() {
  if (!gameActive) return; // Prevent multiple calls if animation end fires late

  console.log("Game Over triggered.");
  gameActive = false; // Set inactive *immediately*

  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }

  if (gameOverMessage) {
    gameOverMessage.textContent = `Game Over! Final Score: ${score}`;
    gameOverMessage.classList.add("visible");
  }

  // Update buttons for game over state
  if (startGameButton) {
    startGameButton.textContent = "Play Again?";
    startGameButton.disabled = false; // Allow restart
  }
  if (stopGameButton) {
    stopGameButton.disabled = true; // Cannot stop when game is over
  }
}

// --- Donut Creation and Interaction ---

function createDonut() {
  // Check flags and elements again inside interval function
  if (!gameActive || !gameArea) {
    // If game stopped or area removed while interval was waiting, clear interval
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }
    return;
  }

  const donut = document.createElement("div");
  donut.classList.add("falling-donut");

  const donutImages = [
    "images/donut1.png", // Make sure these paths are correct relative to index.html
    "images/donut2.png",
    "images/donut3.png",
    "images/donut4.png",
    "images/donut5.png",
  ];
  const randomImagePath = donutImages[Math.floor(Math.random() * donutImages.length)];

  const img = document.createElement("img");
  img.src = randomImagePath;
  img.alt = "Donut";
  img.style.width = "100%"; // Ensure image fills the div
  img.style.height = "100%";
  img.draggable = false; // Prevent dragging image

  donut.appendChild(img);

  // Positioning and Size
  const gameAreaWidth = gameArea.offsetWidth;
  const donutSize = 50; // Adjust size as needed
  donut.style.width = `${donutSize}px`;
  donut.style.height = `${donutSize}px`;
  donut.style.position = 'absolute'; // Crucial for left/top positioning
  donut.style.top = `-${donutSize}px`; // Start above the game area
  donut.style.zIndex = '10'; // Add this to ensure donuts appear above the message

  // Ensure left position is within bounds
  if (gameAreaWidth > donutSize) {
    donut.style.left = `${Math.random() * (gameAreaWidth - donutSize)}px`;
  } else {
    donut.style.left = "0px"; // Avoid negative left if area is too small
  }

  // Animation
  const fallDuration = Math.random() * 2.5 + 2.5; // Adjust speed range (seconds)
  donut.style.animation = `fall ${fallDuration}s linear forwards`; // Use keyframes named 'fall'

  // Click Listener (Catching the donut)
  donut.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    if (!gameActive) return; // Don't score if game isn't active
    score++;
    updateScore();
    donut.remove(); // Remove donut immediately when clicked
  });

  // Animation End Listener (Missed donut)
  donut.addEventListener("animationend", () => {
    // Double-check if the donut still exists (might have been clicked right at the end)
    if (donut.parentNode === gameArea) {
      donut.remove(); // Remove the missed donut
      // Only trigger game over if the game was supposed to be active when it ended
      if (gameActive) {
        gameOver();
      }
    }
  });

  gameArea.appendChild(donut);
}

// Function to initially prepare the game section (e.g., when clicking a nav link)
export function prepareGame() {
  const gameSection = document.getElementById("game"); // Assuming the whole game area is in a section with id="game"
  if (gameSection) {
    gameSection.style.display = "block"; // Or your preferred method of showing it
    resetGame(); // Reset score/message when navigating to the game section
  } else {
    console.error("Game section element ('#game') not found.");
  }
}

// Setup button listeners specifically for the game
export function setupGameButtons() {
  if (startGameButton) {
    startGameButton.addEventListener('click', startGame);
  }
  if (stopGameButton) {
    stopGameButton.addEventListener('click', stopGame);
  }
}
