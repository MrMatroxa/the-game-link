class Player {
  constructor(gameScreen, left, top, width, height) {
    if (!gameScreen) {
      throw new Error("gameScreen element not found"); // Added error handling for null gameScreen
    }
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = "images/Player1.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`; // Apply width
    this.element.style.height = `${this.height}px`; // Apply height
    this.element.style.zIndex = "1";
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top += this.directionY;
    this.left += this.directionX;

    const minLeft = 10;
    const minTop = 10;
    const maxLeft = this.gameScreen.offsetWidth - this.width - 10;
    const maxTop = this.gameScreen.offsetHeight - this.height - 10;

    if (this.left < minLeft) {
      this.left = minLeft;
    }

    if (this.top < minTop) {
      this.top = minTop;
    }

    if (this.left > maxLeft) {
      this.left = maxLeft;
    }

    if (this.top > maxTop) {
      this.top = maxTop;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(enemy) {
    if (!enemy || !enemy.element) {
      // checks if eneies exist
      return false;
    }

    const playerHitbox = this.element.getBoundingClientRect();
    const enemyHitbox = enemy.element.getBoundingClientRect();

    if (
      playerHitbox.left < enemyHitbox.right &&
      playerHitbox.right > enemyHitbox.left &&
      playerHitbox.top < enemyHitbox.bottom &&
      playerHitbox.bottom > enemyHitbox.top
    ) {
      this.element.classList.add("explode");
      setTimeout(() => {
        this.element.remove();
      }, 500); // Match the duration of the explode animation
      return true;
    } else {
      return false;
    }
  }
}

class Player2 extends Player {
  constructor(gameScreen, left, top, width, height) {
    super(gameScreen, left, top, width, height);
    this.element.src = "images/Player2.png";
  }
}
