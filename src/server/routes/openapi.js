const config = require('config');
const { writeFileSync } = require('fs');
const logger = require('log4js').getLogger('openapi');
const {
  createMockMiddleware: mock,
} = require('openapi-mock-express-middleware');
const { merger } = require('../../core/yaml');
const { homeFolderPath } = require('../../utils/homefolder');

const XProxy = 'x-proxy';
const XOptions = 'x-options';

const omitProxies = spec => {
  const options = spec[XOptions] || {};
  Object.keys(spec.paths).forEach(path => {
    Object.keys(spec.paths[path]).forEach(method => {
      const proxy = spec.paths[path][method][XProxy];
      if (proxy !== false && (proxy === true || options.proxy === true)) {
        logger.info('Proxy on', method.toUpperCase(), path);
        delete spec.paths[path][method];
        if (Object.keys(spec.paths[path]).length === 0) {
          delete spec.paths[path];
        }
        return;
      }
      logger.warn('Mock on', method.toUpperCase(), path);
    });
  });
  return spec;
};

module.exports = {
  attach: (app, servers = config.servers || []) => {
    servers.forEach((server, i) => {
      if (!(server.files && server.files.length) || !server.path) {
        return;
      }
      const raw = omitProxies(merger(server.files));
      const file = `${homeFolderPath}/${server.path}-${i}.json`;
      writeFileSync(file, JSON.stringify(raw, null, 2), 'utf-8');
      const mw = mock({
        file,
        options: {
          alwaysFakeOptionals: true,
          useExamplesValue: true,
        },
      });
      // we need to remove handler for `404` and `500`
      mw.stack.splice(-2, 2);
      app.use(server.path, mw);
    });
  },
};
