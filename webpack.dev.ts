import path from "path";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import * as hbsHelpers from "./src/views/helpers";
import { buildProjectPages, projectEntries } from "./src/_projects/project-pages";
import type { Configuration } from "webpack";

buildProjectPages()

function abs(path_string : string): string {
  return path.resolve(__dirname, path_string);
}

module.exports = <Configuration>{
  mode: "development",

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@fonts": abs("node_modules/@fontsource/")
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("src/views/pages/index.hbs"),
        "404": abs("src/views/pages/404.hbs"),
        links: abs("src/views/pages/links.hbs"),
        ... projectEntries,
      },

      data: require("./src/views/data.ts"),

      preprocessor: "handlebars",
      preprocessorOptions: {
        root: abs("src/views/"),
        helpers: hbsHelpers.default,
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
        test: /\.(ico|png|jp?g|webp|avif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.woff2$/,
        type: "asset/resource",
      },
    ],
  },
};