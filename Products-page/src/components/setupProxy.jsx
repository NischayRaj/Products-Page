// // frontend/src/setupProxy.js
// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app",
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "", // remove /api from the URL
//       },
//       onProxyRes: function (proxyRes, req, res) {
//         proxyRes.headers["access-control-allow-origin"] =
//           "http://localhost:5173";
//       },
//     })
//   );
// };
