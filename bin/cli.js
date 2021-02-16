#!/usr/bin/env node

require('../src/utils/init');
const logger = require('log4js').getLogger('cli');
const { version, name } = require('../package.json');

const onFatalError = error => {
  process.exitCode = 2;
  logger.error(`
Oops! Something went wrong! :(
${name}: ${version}
${error.message}`);
  logger.debug(error.stack);
};

process.on('uncaughtException', onFatalError);
process.on('unhandledRejection', onFatalError);

(async function main() {
  // eslint-disable-next-line global-require
  await require('../src')();
})().catch(onFatalError);
