import HtmlBundlerPlugin from "html-bundler-webpack-plugin";

import handlebarsData from "../src/views/data";
import handlebarsHelpers from "../src/views/helpers";

import { buildProjectPages, projectEntries } from "../src/_projects/project-pages";

import { type Configuration } from "webpack";

import {
  pathResolve,
  createResolver,
  type DirResolver
} from "../src/scripts/build/utils";
const absRel: string = createResolver(__dirname)("../");
function abs(path: string): string {
  return pathResolve(absRel, path);
}

buildProjectPages();

export default {
  mode: "development",

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@fonts": abs("./node_modules/@fontsource/"),
      "@node_modules": abs("./node_modules/"),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("./src/views/pages/index.hbs"),
        "404": abs("./src/views/pages/404.hbs"),
        links: abs("./src/views/pages/links.hbs"),
        ... projectEntries,
      },

      data: handlebarsData,

      preprocessor: "handlebars",
      preprocessorOptions: {
        root: abs("./src/views/"),
        helpers: handlebarsHelpers,
        views: [
          abs("./src/views/partials"),
        ],
      },

      loaderOptions: {
        root: abs("./src"),
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
      paths: ["../src/**/*.*"],
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
} as Configuration;