const logger = require('log4js').getLogger('proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('config');

module.exports = {
  attach: app => {
    config.servers.forEach(p => {
      logger.debug(`Adding proxy on ${p.path}`);
      app.use(
        p.path,
        createProxyMiddleware({
          target: p.target,
          changeOrigin: true,
          logLevel: 'silent',
          pathRewrite: {
            [`^${p.path}`]: '',
          },
        }),
      );
    });
  },
};
