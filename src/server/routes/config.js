const config = require('config');

module.exports = (req, res) => {
  res.json(config);
};
