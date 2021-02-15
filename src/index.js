require('./utils/logging');
const config = require('config');
const { getLogger } = require('log4js');
const { name } = require('../package.json');
const { createHomeFolder } = require('./utils/homefolder');
const { listen } = require('./server');

const logger = getLogger(name);

module.exports = async () => {
  logger.debug(config);
  createHomeFolder();
  await listen();
};
