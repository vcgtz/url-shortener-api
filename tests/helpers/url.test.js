const { describe, it, expect } = require('@jest/globals');
const { isUrlValid } = require('../../src/helpers/url');

describe('Test cases for the url.js helper', () => {
  it('isUrlValid() returns true when a URL is valid', () => {
    const url = 'https://www.google.com/';

    expect(isUrlValid(url)).toBe(true);
  });

  it('isUrlValid() returns false when a URL is invalid', () => {
    const url = 'www.google.com/';

    expect(isUrlValid(url)).toBe(false);
  });
});
