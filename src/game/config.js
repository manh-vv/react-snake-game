export const SIZE = 20;

export const SCREEN = {
  w: 600,
  h: 400,
  
  /**
   * 20ms 1 update mean 1000 / 20 = 50 frame per second
   */
  interval: 20,
};

export const DIR = {
  LR: [1, 0],
  RL: [-1, 0],
  TB: [0, 1],
  BT: [0, -1],
};

export const SNAKE = {
  speed: 300,
  step: SIZE,
}