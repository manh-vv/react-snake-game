import { SCREEN, SIZE, DIR, SNAKE } from './config';
import { randomLoc } from './utils';

export class Snake {
  head = randomLoc(Math.min(SCREEN.w, SCREEN.h), SIZE);
  size = SIZE;
  curDir = DIR.LR;
  step = SNAKE.step;
  speed = SNAKE.speed;
  isDeath = false;
  tails = [];

  constructor(food, head) {
    if (head) {
      this.head = head;
    }
    this.food = food;
  }

  handleEat(h) {
    this.tails.push(this.head);
    this.head = h;
  }

  update(ctx) {
    ctx.fillStyle = '#00CC99';

    for (const p of this.tails) {
      ctx.fillRect(p.x, p.y, this.size, this.size);
    }

    ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
  }

  move() {
    if (this.isDeath) return;

    const tP = this.head.clone().move(this.curDir[0] * this.step, this.curDir[1] * this.step);
    // check alive
    this.isDeath =
      0 > tP.x || tP.x > SCREEN.w - this.step || 0 > tP.y || tP.y > SCREEN.h - this.step;

    if (this.isDeath) {
      console.info('The snake is death');
      return;
    }

    if (tP.x == this.food.loc.x && tP.y == this.food.loc.y) {
      this.handleEat(this.food.loc.clone());
      this.food.eated();
    } else {
      this.tails.push(this.head.clone());
      this.tails.shift();
      this.head.move(this.curDir[0] * this.step, this.curDir[1] * this.step);
    }

    setTimeout(() => this.move(), this.speed);
  }

  onKeyDown(e) {
    console.debug('hit key:', e.key);

    switch (e.key) {
      case 'ArrowDown':
        this.curDir = DIR.TB;
        break;
      case 'ArrowUp':
        this.curDir = DIR.BT;
        break;
      case 'ArrowRight':
        this.curDir = DIR.LR;
        break;
      case 'ArrowLeft':
        this.curDir = DIR.RL;
        break;
      case 'c':
        this.isDeath = false;
        this.move();
        break;
      default:
        console.log('-- unknown key:', e.key);
        return;
    }
  }
}
