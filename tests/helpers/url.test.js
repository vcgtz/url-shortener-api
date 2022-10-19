const { describe, it, expect } = require('@jest/globals');
const { isUrlValid } = require('../../src/helpers/url');

describe('URL Helper test cases', () => {
  it('Returns true when an URL is valid', () => {
    const url = 'https://www.google.com/';

    expect(isUrlValid(url)).toBe(true);
  });

  it('Returns false when an URL is invalid', () => {
    const url = 'www.google.com/';

    expect(isUrlValid(url)).toBe(false);
  });
});
