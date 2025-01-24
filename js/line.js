class Line {
  constructor(gameScreen, segmentCount, segmentWidth, segmentHeight) {
    this.gameScreen = gameScreen;
    this.segmentCount = segmentCount;
    this.segmentWidth = segmentWidth;
    this.segmentHeight = segmentHeight;
    this.segments = [];
    this.maxLength = 250;

    for (let i = 0; i < segmentCount; i++) {
      const segment = new LineSegment(
        gameScreen,
        0,
        0,
        segmentWidth,
        segmentHeight
      );
      this.segments.push(segment);
    }
  }

  update(player1, player2) {
    const player1Rect = player1.element.getBoundingClientRect();
    const player2Rect = player2.element.getBoundingClientRect();
    const gameScreenRect = this.gameScreen.getBoundingClientRect();

    const x1 = player1Rect.left + player1Rect.width / 2 - gameScreenRect.left;
    const y1 = player1Rect.top + player1Rect.height / 2 - gameScreenRect.top;
    const x2 = player2Rect.left + player2Rect.width / 2 - gameScreenRect.left;
    const y2 = player2Rect.top + player2Rect.height / 2 - gameScreenRect.top;

    const distance = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    const segmentLength = distance / this.segmentCount;
    for (let i = 0; i < this.segmentCount; i++) {
      const left = x1 + i * segmentLength * Math.cos(angle * (Math.PI / 180));
      const top = y1 + i * segmentLength * Math.sin(angle * (Math.PI / 180));
      this.segments[i].updatePosition(left, top, angle);
    }
    if (distance > this.maxLength) {
      this.changeAppearance();
    } else {
      this.appearance();
    }
  }

  didLineCollide(player1, player2, enemy) {
    const player1Rect = player1.element.getBoundingClientRect();
    const player2Rect = player2.element.getBoundingClientRect();
    const gameScreenRect = this.gameScreen.getBoundingClientRect();

    const x1 = player1Rect.left + player1Rect.width / 2 - gameScreenRect.left;
    const y1 = player1Rect.top + player1Rect.height / 2 - gameScreenRect.top;
    const x2 = player2Rect.left + player2Rect.width / 2 - gameScreenRect.left;
    const y2 = player2Rect.top + player2Rect.height / 2 - gameScreenRect.top;

    const distance = Math.hypot(x2 - x1, y2 - y1);

    // Disable collision detection if the line exceeds the maximum length
    if (distance > this.maxLength) {
      return false;
    }
    for (const segment of this.segments) {
      if (!enemy || !enemy.element) {
        //checks if enemy exists
        return false;
      }
      const segmentRect = segment.getBoundingClientRect();
      const enemyRect = enemy.element.getBoundingClientRect();

      if (
        segmentRect.left < enemyRect.right &&
        segmentRect.right > enemyRect.left &&
        segmentRect.top < enemyRect.bottom &&
        segmentRect.bottom > enemyRect.top
      ) {
        return true;
      }
    }
    return false;
  }

  appearance() {
    for (const segment of this.segments) {
      segment.element.style.opacity = "1"; // Change opacity
    }
  }

  changeAppearance() {
    for (const segment of this.segments) {
      segment.element.style.opacity = "0"; // Change opacity
    }
  }
}
