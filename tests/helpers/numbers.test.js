const { describe, it, expect } = require('@jest/globals');
const numbersHelper = require('../../src/helpers/numbers');

describe('Number Helper test cases', () => {
  it('convert 1000 (base10) to (G8) base62', () => {
    const base62 = numbersHelper.convertToBase62(1000);

    expect(base62).toBe('G8');
  });
});
