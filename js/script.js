window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const menuButton = document.getElementById("menu-button");
  
  // ======
  const storedHighScore = localStorage.getItem("highScore");
  const renderHighScoreUI = storedHighScore ? storedHighScore : 0;
  const initialHighScoreUI = document.getElementById("init-high-score");
  // const score = document.getElementById("score-text");
  // score.style.display = "none";

  if (renderHighScoreUI) {
    initialHighScoreUI.innerText = renderHighScoreUI;
  } else {
    localStorage.setItem("highScore", 0);
  }
  // ======

  
  let game;
  startButton.onclick = () => {
    startGame();
  };
  restartButton.onclick = () => {
    startGame();
    // location.reload();
  };
  menuButton.onclick = () => {
    location.reload();
  }
  
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }
  
  const possibleKeystrokes = new Set([
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "w",
    "a",
    "s",
    "d",
  ]);

  const keysPressed = new Set();

  document.onkeydown = function (e) {
    if (possibleKeystrokes.has(e.key)) {
      e.preventDefault();
      keysPressed.add(e.key);
      updatePlayerDirections();
    }
  };

  document.onkeyup = function (e) {
    if (possibleKeystrokes.has(e.key)) {
      e.preventDefault();
      keysPressed.delete(e.key);
      updatePlayerDirections();
    }
  };

  function updatePlayerDirections() {
    // Reset directions
    game.player.directionX = 0;
    game.player.directionY = 0;
    game.player2.directionX = 0;
    game.player2.directionY = 0;

    // Update directions based on currently pressed keys
    for (const key of keysPressed) {
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -2;
          break;
        case "ArrowUp":
          game.player.directionY = -2;
          break;
        case "ArrowRight":
          game.player.directionX = 2;
          break;
        case "ArrowDown":
          game.player.directionY = 2;
          break;
        case "a":
          game.player2.directionX = -2;
          break;
        case "w":
          game.player2.directionY = -2;
          break;
        case "d":
          game.player2.directionX = 2;
          break;
        case "s":
          game.player2.directionY = 2;
          break;
      }
    }
  }
};
