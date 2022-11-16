const isAlphaNumeric = (str) => {
  const regex = /[^a-z0-9]/g;

  return str.toLowerCase().search(regex) === -1;
};

module.exports = {
  isAlphaNumeric,
};
