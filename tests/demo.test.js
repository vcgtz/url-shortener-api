const { describe, expect, it } = require('@jest/globals');

describe('Demo test suit', () => {
  it('Sum 1 + 2 = 3', () => {
    expect(1 + 2).toBe(3);
  });
});
