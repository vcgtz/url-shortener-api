/* eslint-disable function-paren-newline */
const range = (start, end, step = 1) =>
  Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);

const getLowerCharsArray = () =>
  range('a'.charCodeAt(0), 'z'.charCodeAt(0)).map((c) =>
    String.fromCharCode(c),
  );

const getUpperCharsArray = () =>
  range('A'.charCodeAt(0), 'Z'.charCodeAt(0)).map((c) =>
    String.fromCharCode(c),
  );

const getBase62Chars = () => {
  const numbers = range(0, 9);
  const upperCaseChars = getUpperCharsArray();
  const lowerCaseChars = getLowerCharsArray();

  return [...numbers, ...upperCaseChars, ...lowerCaseChars];
};

const isBase10 = (base10) =>
  base10
    .toString()
    .split('')
    .every((v) => {
      const s = `${v}`;

      return (
        s.charCodeAt(0) >= '0'.charCodeAt(0) &&
        s.charCodeAt(0) <= '9'.charCodeAt(0)
      );
    });

const convertToBase62 = (base10) => {
  const base62Chars = getBase62Chars();
  const digits = [];
  let number = +base10;

  while (number > 0) {
    const reminder = number % 62;
    digits.push(reminder);
    number = parseInt(number / 62, 10);
  }

  const base62 = digits
    .reverse()
    .map((d) => base62Chars[d])
    .join('');

  if (!base62) {
    return '0';
  }

  return base62;
};

module.exports = {
  convertToBase62,
  getBase62Chars,
  getLowerCharsArray,
  getUpperCharsArray,
  isBase10,
  range,
};
