// dev代理
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/website', {
    target: 'http://homesite.ftms.devbmsoft.cn/',
    pathRewrite: { '^/website': '/website' },
    router: {
      '/website/api/' : 'http://website.ftms.devbmsoft.cn/'   // path only
    },
    changeOrigin: true
  }))
};

