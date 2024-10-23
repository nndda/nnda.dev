const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

function abs(path_string) {
  return path.resolve(__dirname, path_string);
}

module.exports = {
  mode: "development",

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("src/views/index.hbs"),
      },

      preprocessor: "handlebars",
      preprocessorOptions: {
        root: abs("src/views/"),
        views: [
          abs("src/views/partials"),
        ],
      },

      hotUpdate: true,
    }),
  ],

  devServer: {
    watchFiles: {
      paths: ["src/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },

  module: {
      rules: [
        {
          test: /\.s?css$/,
          use: ["css-loader", "sass-loader"],
        },
        {
          test: /\.(ico|png|jp?g|svg)/,
          type: "asset/resource",
        },
      ],
    },
};