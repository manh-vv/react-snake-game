export class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  move(stepX, stepY) {
    this.x += stepX;
    this.y += stepY;
    return this;
  }

  clone() {
    return new Point(this.x, this.y);
  }
}
