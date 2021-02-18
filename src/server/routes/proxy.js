const logger = require('log4js').getLogger('proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('config');

module.exports = {
  attach: app => {
    config.servers.forEach(server => {
      if (!(server.proxy && server.proxy.target)) {
        return;
      }
      logger.debug(`Adding proxy on ${server.path}`);
      app.use(
        server.path,
        createProxyMiddleware({
          ...server.proxy,
          changeOrigin: true,
          logProvider() {
            return logger;
          },
          pathRewrite: {
            [`^${server.path}`]: '',
          },
          onProxyReq(proxyReq, req) {
            if (req.body) {
              const bodyData = JSON.stringify(req.body);
              proxyReq.setHeader('Content-Type', 'application/json');
              proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
              proxyReq.write(bodyData);
            }
          },
        }),
      );
    });
  },
};
