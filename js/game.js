class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameText = document.getElementById("game-container");
    this.player = new Player(this.gameScreen, 350, 300, 30, 30);
    this.player2 = new Player2(this.gameScreen, 250, 300, 30, 30);
    this.line = new Line(this.gameScreen, 200, 3, 3); // 10 segments, each 3px wide and 3px high
    this.height = 600;
    this.width = 600;
    this.enemies = [];
    this.score = 0;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.scorePosition = document.getElementById("score");

    this.enemySpawnInterval = 4000; // Initial interval for spawning enemies (in milliseconds)
    this.enemySpawnDecreaseRate = 500; // Decrease rate for the interval (in milliseconds)
    this.minEnemySpawnInterval = 1000; // Minimum interval for spawning enemies (in milliseconds)
  }

  start() {
    console.log(`gamestarrrtt!!!`);
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.startEnemySpawning();
  }

  gameLoop() {
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      clearInterval(this.enemySpawnIntervalId);
    }
    console.log("in the game looooooooooop!");
    this.update();
  }

  update() {
    // Update game state (e.g., player position, enemy positions)
    console.log("updates yay!");
    this.player.move();
    this.player2.move();
    this.line.update(this.player, this.player2);
    this.destroyEnemy();
    this.checkPlayerCollision();
    this.checkIfEnemyExploded();
    this.checkPlayerEnemyCollision();
  }

  startEnemySpawning() {
    if (this.gameIsOver) return;

    this.enemySpawnIntervalId = setInterval(() => {
      this.spawnEnemy();
    }, this.enemySpawnInterval);

    this.decreaseEnemySpawnInterval();
  }

  decreaseEnemySpawnInterval() {
    if (this.gameIsOver) return;

    setTimeout(() => {
      if (this.enemySpawnInterval > this.minEnemySpawnInterval) {
        this.enemySpawnInterval -= this.enemySpawnDecreaseRate;
        clearInterval(this.enemySpawnIntervalId);
        this.enemySpawnIntervalId = setInterval(() => {
          this.spawnEnemy();
        }, this.enemySpawnInterval);
        this.decreaseEnemySpawnInterval();
      }
    }, 10000); // Decrease the interval every 10 seconds
  }

  spawnEnemy() {
    if (this.gameIsOver) return;
    
    const newEnemy = new Enemy(this.gameScreen, this.width, this.height, this);
    this.enemies.push(newEnemy);
    console.log("New enemy added:", newEnemy);
  }

  endGame() {
    if (this.gameIsOver) return; // Ensure endGame is called only once

    console.log("game over");
    this.gameIsOver = true;

    // Remove all game elements and check if they exist before removing
    if (this.player && this.player.element) {
      this.player.element.remove();
    }
    if (this.player2 && this.player2.element) {
      this.player2.element.remove();
    }
    this.enemies.forEach((enemy) => {
      if (enemy && enemy.element) {
        enemy.element.remove();
      }
    });
    this.line.segments.forEach((segment) => {
      if (segment && segment.element) {
        segment.element.remove();
      }
    });

    // Hide game screen and show end screen
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }

  updateScore() {
    this.score += 1;
    this.scorePosition.innerText = `${this.score}`;
  }

  destroyEnemy() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (this.line.didLineCollide(this.player, this.player2, enemy)) {
        enemy.explode();
        this.enemies.splice(i, 1);
        i--; // Adjust the index after removal to avoid skipping the next enemy
        this.updateScore();
      } else {
        this.checkPlayerEnemyCollision(enemy); // Pass the enemy object
      }
    }
  }

  checkPlayerEnemyCollision(enemy) {
    if (this.player.didCollide(enemy) || this.player2.didCollide(enemy)) {
      this.line.segments.forEach((segment) => segment.element.remove()); // Removes each line segment
      setTimeout(() => {
        this.endGame();
      }, 500); // Match the duration of the explode animation
    }
  }

  checkPlayerCollision() {
    const player1Rect = this.player.element.getBoundingClientRect();
    const player2Rect = this.player2.element.getBoundingClientRect();

    if (
      player1Rect.left < player2Rect.right &&
      player1Rect.right > player2Rect.left &&
      player1Rect.top < player2Rect.bottom &&
      player1Rect.bottom > player2Rect.top
    ) {
      this.player.element.classList.add("explode");
      this.line.segments.forEach((segment) => segment.element.remove()); // Removes each line segment
      setTimeout(() => {
        this.player.element.remove();
      }, 500); // Match the duration of the explode animation
      this.player2.element.classList.add("explode");
      setTimeout(() => {
        this.player2.element.remove();
      }, 500);
      setTimeout(() => {
        this.endGame();
      }, 500); // Match the duration of the explode animation
    }
  }

  checkIfEnemyExploded() {
    for (const enemy of this.enemies) {
      if (enemy.exploded) {
        this.endGame();
        break;
      }
    }
  }
}
