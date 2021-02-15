const log4js = require('log4js');
const config = require('config');

const configuration = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'coloured',
      },
    },
  },
  categories: {
    default: {
      level: config.log.level,
      appenders: ['out'],
    },
  },
};
log4js.configure(configuration);
