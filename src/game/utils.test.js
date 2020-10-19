const { random, randomLoc, SIZE } = require('./utils');

describe('utils', () => {
  it('make a random', () => {
    for (let i = 0; i < 1000; i++) {
      expect(random(10, 15)).toBeLessThanOrEqual(15);
      expect(random(10, 15)).toBeGreaterThanOrEqual(10);
    }
  });
  
  it('make random location', () => {
    for (let i = 0; i < 1000; i++) {
      const loc = randomLoc(600);
      expect(loc.x % SIZE).toEqual(0);
      expect(loc.y % SIZE).toEqual(0);

      expect(loc.x).toBeLessThan(600);
      expect(loc.y).toBeLessThan(600);
    }
  });
});
