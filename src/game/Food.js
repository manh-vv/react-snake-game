import { randomLoc } from './utils';
import { SIZE, SCREEN } from './config';

export class Food {
  constructor(location, size = SIZE) {
    this.loc = location;
    this.size = size;

    if (!this.loc) {
      this.eated();
    }
  }

  eated() {
    this.loc = randomLoc(Math.min(SCREEN.w, SCREEN.h), SIZE);
  }

  update(ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.loc.x, this.loc.y, this.size, this.size);
  }
}
