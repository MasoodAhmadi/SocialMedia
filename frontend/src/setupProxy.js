const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/**", {
      target: "/api2/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api": "" },
      headers: {
        apikey: "1234567Masood",
        origin: null,
      },
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.setHeader("accept-encoding", "identity");
      },
    })
  );
};
