// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://startup-compass-api.onrender.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
