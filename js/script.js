const startScreen = document.getElementById("game-intro");
const gameScreen = document.getElementById("game-screen");
const gameEndScreen = document.getElementById("game-end");

const startButton = document.getElementById("start-button");

const startMusic = document.getElementById("start-music");
const gameMusic = document.getElementById("game-music");
const endMusic = document.getElementById("end-music");

// music on
const musicOnIcon = document.getElementById("music-on");
// music off
const musicOffIcon = document.getElementById("music-off");

const sfxIcon = document.getElementById("sfx");
let sfxVolume = 0;

function playMusic(music) {
  music.currentTime = 0;
  music.play();
}

function stopAllMusic() {
  stopMusic(startMusic);
  stopMusic(gameMusic);
  stopMusic(endMusic);
  startMusic.currentTime = 0;
  gameMusic.currentTime = 0;
  endMusic.currentTime = 0;
}

function stopMusic(music) {
  music.pause();
  music.currentTime = 0;
}
let isMusicOn = false;

musicOnIcon.addEventListener("click", function () {
  musicOnIcon.style.display = "none";
  musicOffIcon.style.display = "block";
  isMusicOn = false;

  stopAllMusic();
});

musicOffIcon.addEventListener("click", function () {
  musicOnIcon.style.display = "block";
  musicOffIcon.style.display = "none";
  isMusicOn = true;

  playCurrentMusic();
});

function playCurrentMusic() {
  if (window.getComputedStyle(startScreen).display === "block") {
    playMusic(startMusic);
  }
  if (window.getComputedStyle(gameScreen).display === "block") {
    playMusic(gameMusic);
  }
  if (window.getComputedStyle(gameEndScreen).display === "block") {
    playMusic(endMusic);
  }
}

window.onload = function () {
  startScreen.style.display === "block";
  gameScreen.style.display === "none";
  gameEndScreen.style.display === "none";

  const restartButton = document.getElementById("restart-button");
  const menuButton = document.getElementById("menu-button");
  // ====== High Score =========
  const storedHighScore = localStorage.getItem("highScore");
  const renderHighScoreUI = storedHighScore ? storedHighScore : 0;
  const initialHighScoreUI = document.getElementById("init-high-score");

  if (renderHighScoreUI) {
    initialHighScoreUI.innerText = renderHighScoreUI;
  } else {
    localStorage.setItem("highScore", 0);
  }

  // ========================
  let game;
  startButton.onclick = () => {
    startGame();
    window.sound.startAudio.play();
  };
  restartButton.onclick = () => {
    startGame();
    // location.reload();
  };

  menuButton.onclick = () => {
    gameEndScreen.style.display = "none";
    startScreen.style.display = "block";
    if (window.getComputedStyle(musicOnIcon).display === "block") {
      stopAllMusic();
      playMusic(startMusic);
    } else {
      stopAllMusic();
    }
  };

  function startGame() {
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

  window.sound.sfxToggle();
};
