class Enemy {
  constructor(gameScreen, gameScreenWidth, gameScreenHeight, game) {
    this.gameScreen = gameScreen;
    this.game = game;
    this.width = 35;
    this.height = 35;
    this.exploded = false;
    this.explosionAudio = new Audio("audio/explosion-timer.mp3");
    this.enemyDied = false;

    // Get the dimensions of the game screen
    this.gameScreenWidth = gameScreenWidth;
    this.gameScreenHeight = gameScreenHeight;

    // Calculate random position
    this.left = Math.floor(Math.random() * (gameScreenWidth - this.width));
    this.top = Math.floor(Math.random() * (gameScreenHeight - this.height));

    // Create loading element
    this.loadingElement = document.createElement("img");
    this.loadingElement.classList.add("animation");
    this.loadingElement.src = "images/loading-enemy.png";
    this.loadingElement.style.position = "absolute";
    this.loadingElement.style.width = `${this.width}px`; // Apply width
    this.loadingElement.style.height = `${this.height}px`; // Apply height
    this.loadingElement.style.left = `${this.left}px`;
    this.loadingElement.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.loadingElement);

    // Simulate loading time before spawning the actual enemy
    // setTimeout(() => {
    //   this.spawnEnemy();
    // }, 2000); // Adjust the loading time as needed
  }

  spawnEnemy() {
    // Remove loading element
    this.loadingElement.remove();

    // Create actual enemy element
    this.element = document.createElement("img");
    this.element.src = "images/enemy.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`; // Apply width
    this.element.style.height = `${this.height}px`; // Apply height
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    //this.element.classList.add('pulsate'); // Add pulsate animation
    this.gameScreen.appendChild(this.element);
    this.updatePosition();
    this.pulsate();
    // this.pulsate2();
    this.playExplosionAudio();
    this.checkDead();
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  }

  pulsate() {
    const timeout = 2000;
    setTimeout(() => {
      if (this.element) {
        this.element.classList.add("pulsate");
        setTimeout(() => {
          this.element.classList.remove("pulsate");
          this.element.classList.add("pulsate2");
        }, timeout * 2);
        setTimeout(() => {
          this.element.classList.remove("pulsate2");
          this.element.classList.add("explode");
          setTimeout(() => {
            this.element.remove();
            this.exploded = true; // Set exploded flag
          }, 500);
        }, timeout * 3);
      }
    }, timeout); // Adjust the pulsate interval
  }

  playExplosionAudio() {
    this.explosionAudio.play();
  }

  stopExplosionAudio() {
    this.explosionAudio.pause();
    this.explosionAudio.currentTime = 0;
  }

  checkDead() {
    if (this.enemyDied) {
      console.log("Enemy died");
      this.stopExplosionAudio();
    }
  }

  // endGameExplode() {
  //   if (this.element) {
  //     this.element.classList.remove("pulsate2");
  //     this.element.classList.add("explode");
  //     setTimeout(() => {
  //       this.element.remove();
  //       //this.game.endGame(); // Trigger end game
  //     }, 500); // Match the duration of the explode animation
  //   }
  // }
  // pulsate2() {
  //   setTimeout(() => {
  //     if (this.element) {
  //       this.element.classList.remove('pulsate');
  //       this.element.classList.add('pulsate2');
  //     }
  //   }, 4000); // Adjust the pulsate interval
  // }

  explode() {
    if (this.element) {
      this.element.classList.remove("pulsate");
      this.element.classList.add("explode");
      setTimeout(() => {
        this.element.remove();
        //this.game.endGame(); // Trigger end game
      }, 500); // Match the duration of the explode animation
    }
  }
}
