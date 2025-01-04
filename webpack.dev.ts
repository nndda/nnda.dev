import path from "path";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";

function abs(path_string : string): string {
  return path.resolve(__dirname, path_string);
}

module.exports = {
  mode: "development",

  resolve: {
    extensions: [".js", ".ts"],
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("src/views/index.hbs"),
        "404": abs("src/views/404.hbs"),
        links: abs("src/views/links.hbs"),
      },

      data: require("./src/views/data.ts"),

      preprocessor: "handlebars",
      preprocessorOptions: {
        root: abs("src/views/"),
        views: [
          abs("src/views/partials"),
        ],
      },

      loaderOptions: {
        root: abs("src"),
        sources: [
          {
            tag: "div",
            attributes: ["style"],
          },
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
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};