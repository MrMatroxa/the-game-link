class LineSegment {
  constructor(gameScreen, left, top, width, height) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    this.element = document.createElement("img");
    this.element.src = "images/line-segment.png"; // Path to the line segment image
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition(left, top, angle) {
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.element.style.transform = `rotate(${angle}deg)`;
  }

  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }
}
