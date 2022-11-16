const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function (app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(
      createProxyMiddleware('/api/**', {
        target: '/api/',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
        headers: {
          apikey: '1234567Masood',
          origin: null,
        },
        onProxyReq: function (proxyReq, req, res) {
          proxyReq.setHeader('accept-encoding', 'identity');
        },
      })
    );
  } else if (process.env.NODE_ENV === 'production') {
    app.use(
      createProxyMiddleware('/api/**', {
        target: process.env.REST_ADDRESS,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
        headers: {
          apikey: process.env.API_KEY,
          origin: null,
        },
        onProxyReq: function (proxyReq, req, res) {
          proxyReq.setHeader('accept-encoding', 'identity');
        },
      })
    );
  }
};

// const { createProxyMiddleware } = require('http-proxy-middleware');
// require('dotenv').config();

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware('/api/**', {
//       target: '/api/',
//       changeOrigin: true,
//       secure: false,
//       pathRewrite: { '^/api': '' },
//       // headers: {
//       //   apikey: '1234567Masood',
//       //   origin: null,
//       // },
//       onProxyReq: function (proxyReq, req, res) {
//         proxyReq.setHeader('accept-encoding', 'identity');
//       },
//     })
//   );
// };
