const { describe, it, expect } = require('@jest/globals');
const base62Helper = require('../../src/helpers/base62');

describe('Test cases for the base62.js helper', () => {
  it('convertToBase62() returns ae23F when converting 541489105 (base 10)', () => {
    const base62 = base62Helper.convertToBase62(541489105);

    expect(base62).toBe('ae23F');
  });

  it('convertToBase62() returns 0 when converting 0 (base 10)', () => {
    const base62 = base62Helper.convertToBase62(0);

    expect(base62).toBe('0');
  });

  it('getLowerCharsArray() must be equals to a lower case alphabet array', () => {
    expect(base62Helper.getLowerCharsArray().join('')).toBe(
      'abcdefghijklmnopqrstuvwxyz',
    );
  });

  it('getUpperCharsArray() must be equals to a upper case alphabet array', () => {
    expect(base62Helper.getUpperCharsArray().join('')).toBe(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    );
  });

  it('isBase10() returns true when checking if 123 is base 10', () => {
    expect(base62Helper.isBase10(123)).toBe(true);
  });

  it('isBase10() returns true when checking if 0 is base 10', () => {
    expect(base62Helper.isBase10(0)).toBe(true);
  });

  it('isBase10() returns true when checking if 17803 is base 10', () => {
    expect(base62Helper.isBase10(17803)).toBe(true);
  });

  it('isBase10() returns false when checking if "abc" is base 10', () => {
    expect(base62Helper.isBase10('abc')).toBe(false);
  });

  it('isBase10() returns false when checking if "13ED87" is base 10', () => {
    expect(base62Helper.isBase10('13ED87')).toBe(false);
  });

  it('isBase10() returns false when checking if "ae23F" is base 10', () => {
    expect(base62Helper.isBase10('ae23F')).toBe(false);
  });

  it('range() returns an array from 0 to 9 when using 0 as start and 9 as end', () => {
    expect(base62Helper.range(0, 9).join('')).toBe('0123456789');
  });

  it('range() returns an array from 5 to 14 when using 5 as start and 14 as end', () => {
    expect(base62Helper.range(5, 14).join('')).toBe('567891011121314');
  });

  it('range() returns an array like [2, 4, 6, 8, 10] when using 2 as start, 10 as end, and 2 as step', () => {
    expect(base62Helper.range(2, 10, 2).join('')).toBe('246810');
  });
});
