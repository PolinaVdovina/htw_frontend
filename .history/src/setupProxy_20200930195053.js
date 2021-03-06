const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8081',
    })
  ),
  app.use(
    '/websocket',
    createProxyMiddleware({
      target: 'ws://127.0.0.1:8081',
      ws: true,
    })
  );
};