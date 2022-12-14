const { describe, it, expect } = require('@jest/globals');
const stringsHelper = require('../../src/helpers/string');

describe('Test cases for the string.js helper', () => {
  it('isAlphaNumeric() returns true when the string contains only alphanumeric characters', () => {
    const stringA = 'abc1234';
    const stringB = 'ABCD';
    const stringC = '1234';
    const stringD = 'A1b2C3d4';
    const stringE = '';

    expect(stringsHelper.isAlphaNumeric(stringA)).toBe(true);
    expect(stringsHelper.isAlphaNumeric(stringB)).toBe(true);
    expect(stringsHelper.isAlphaNumeric(stringC)).toBe(true);
    expect(stringsHelper.isAlphaNumeric(stringD)).toBe(true);
    expect(stringsHelper.isAlphaNumeric(stringE)).toBe(true);
  });

  it('isAlphaNumeric() returns false when the string contains only alphanumeric characters', () => {
    const stringA = 'abcd#456';
    const stringB = '!@#$%%^^';
    const stringC = 'abcde 1234';
    const stringD = 'abcde.';
    const stringE = '.';

    expect(stringsHelper.isAlphaNumeric(stringA)).toBe(false);
    expect(stringsHelper.isAlphaNumeric(stringB)).toBe(false);
    expect(stringsHelper.isAlphaNumeric(stringC)).toBe(false);
    expect(stringsHelper.isAlphaNumeric(stringD)).toBe(false);
    expect(stringsHelper.isAlphaNumeric(stringE)).toBe(false);
  });
});
