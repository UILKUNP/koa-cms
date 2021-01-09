const path = require("path");
module.exports = {
  lintOnSave: false,
  // publicPath:'/screen2',
  devServer: {
    disableHostCheck: true,
    port: 9999,
    overlay: {
      warnings: false,
      errors: false,
    },
    //https://api.github.com/proxyServer/======>http://localhost:8080/proxyServer/
    //pathRewrite :   '^/proxyServer' ======> ''
    //https://api.github.com/======>http://localhost:8080/proxyServer
    // proxy: {
    //   "/proxyServer": {
    //     target: "'https://gallery.echartsjs.com/",
    //     changeOrigin: true,
    //     secure:true, //https
    //     pathRewrite:{
    //       '^/proxyServer':''
    //     }
    //   }
    // }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "大弟表情";
      return args;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "@api": path.resolve("src/api"),
        "@lib": path.resolve("src/lib"),
        "@mixins": path.resolve("src/mixins"),
        "@imgs": path.resolve("imgs"),
      },
    },
  },
};
