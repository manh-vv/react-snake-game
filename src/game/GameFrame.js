import { SCREEN, SIZE } from './config';

export class GameFrame {
  gridSize = SIZE;
  interval = SCREEN.interval;

  objects = [];

  /**
   * 0 stop
   * 1 playing
   * 2 pause
   */
  state = 0;

  constructor(containerEl) {
    this.container = containerEl;
    this.init();
  }

  init() {
    if (!this.container) return;
    const paintStyle = getComputedStyle(this.container);

    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    canvas.width = SCREEN.w = parseInt(paintStyle.getPropertyValue('width'));
    canvas.height = SCREEN.h = parseInt(paintStyle.getPropertyValue('height'));
    canvas.tabIndex = 1;
    canvas.autofocus = true;
    canvas.onkeydown = (e) => this.onKeyDown(e);

    canvas.setAttribute('style', 'border: 1px dotted gray;');

    this.container.appendChild(canvas);
  }

  showGrid() {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#000000';

    for (let x = this.gridSize; x < this.canvas.width; x += this.gridSize) {
      this.drawLine(x, 0, x, this.canvas.height);
    }

    for (let y = this.gridSize; y < this.canvas.height; y += this.gridSize) {
      this.drawLine(0, y, this.canvas.width, y);
    }
  }

  drawLine(x1, y1, x2, y2) {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  start(interval = SCREEN.interval) {
    this.state = 1;
    this.interval = interval;
    this.update();
  }

  stop() {
    this.state = 0;
  }

  onKeyDown(e) {
    for (const obj of this.objects) {
      if (typeof obj['onKeyDown'] == 'function') {
        obj.onKeyDown(e, this);
      }
    }
  }

  update() {
    const t0 = Date.now();
    this.clear();
    this.showGrid();

    for (const obj of this.objects) {
      obj.update(this.ctx);
    }

    const dt = Date.now() - t0;

    if (dt > this.interval) {
      throw new Error(`Interval is too short for update: ${dt}`);
    }

    const t = this.interval - dt;
    // console.info(`Game will be updated in ${t}ms.`);
    if (this.state === 1) {
      setTimeout(() => this.update(), t);
    }
  }

  addObject(obj) {
    obj.gameFrame = this;
    this.objects.push(obj);
  }
}
