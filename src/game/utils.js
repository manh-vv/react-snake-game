import { Point } from './Point';
import { SIZE } from './config';

export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomLoc(max, size = SIZE) {
  let x = random(size, max - size);
  x -= x % size;
  let y = random(size, max - size);
  y -= y % size;

  return new Point(x, y);
}
