const isUrlValid = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (err) {
    return false;
  }
};

module.exports = {
  isUrlValid,
};
