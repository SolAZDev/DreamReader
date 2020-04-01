module.exports = {
  pwa: {
    name: "DreamReader"
  },

  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "DreamReader - Dream Interpretations";
      return args;
    });
  },

  publicPath: "/DreamReader/",
  assetsDir: "assets",
  outputDir: "dist"
};
