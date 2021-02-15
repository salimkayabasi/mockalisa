const { connectLogger, getLogger } = require('log4js');

const logger = getLogger('router');
const configRouter = require('./config');
const proxy = require('./proxy');
const openapi = require('./openapi');

module.exports = async app => {
  app.use(connectLogger(logger));
  app.use('/config', configRouter);
  openapi.attach(app);
  proxy.attach(app);
};
