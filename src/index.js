require('./utils/logging');
const logger = require('log4js').getLogger('mockalise');

const config = require('config');
const { createHomeFolder } = require('./utils/homefolder');
const { listen } = require('./server');

module.exports = async () => {
  logger.debug(config);
  createHomeFolder();
  await listen();
};
