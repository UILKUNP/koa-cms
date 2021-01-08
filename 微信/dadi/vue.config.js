const path = require("path");
module.exports = {
  lintOnSave: false,
  // publicPath:'/screen2',
  devServer: {
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
        "@view": path.resolve("src/views"),
        "@com": path.resolve("src/components"),
        "@err": path.resolve("src/lib/Error"),
        "@tools": path.resolve("src/lib/Tools"),
        "@router": path.resolve("src/router"),
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/less/index.less")],
    },
  },
};
