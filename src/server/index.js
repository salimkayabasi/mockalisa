const logger = require('log4js').getLogger('server');
const express = require('express');
const config = require('config');
const setRoutes = require('./routes');
const { getCurrentAddresses } = require('../utils/hostname');

const app = express();

module.exports = {
  listen: async () => {
    await setRoutes(app);
    app.listen(config.port, () => {
      const url = `${getCurrentAddresses()}:${config.port}`;
      logger.info(`Please visit http://${url}/config`);
    });
  },
};
