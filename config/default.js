const { existsSync } = require('fs');
const { resolve, isAbsolute } = require('path');
const { parser } = require('../src/core/yaml');

const configPath = process.argv[2] || 'config.yml';
if (!existsSync(resolve(process.cwd(), configPath))) {
  // eslint-disable-next-line no-console
  console.error('Please make sure that you have `config.yml` file.');
  process.exit(1);
}

const config = parser(configPath);
const cwd = process.cwd();

module.exports = {
  port: config.port || '1881',
  log: {
    level: 'ALL',
    ...config.log,
  },
  servers: (config.servers || [])
    .map(server => {
      server.files = (server.files || []).map(file => {
        if (!isAbsolute(file)) {
          return resolve(cwd, file);
        }
        return file;
      });
      return server;
    })
    .filter(s => s.path),
};
