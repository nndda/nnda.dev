import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import webpack from "webpack";
import type { Configuration, RuleSetRule } from "webpack";

import CopyPlugin from "copy-webpack-plugin";
export function copyToDist(path: string): CopyPlugin.Pattern {
  return { from: abs("./src/" + path), to: abs("./dist/") }
}

import handlebarsData from "../src/views/data";
import handlebarsHelpers from "../src/views/helpers";

import { buildProjectPages, projectEntries } from "../src/_projects/project-pages";
buildProjectPages();

import {
  pathResolve,
  createResolver,
} from "../src/scripts/build/utils";
const absRel: string = createResolver(__dirname)("../");
export function abs(path: string): string {
  return pathResolve(absRel, path);
}

export default {
  resolve: {
    extensions: [".js", ".ts", ".json"],
    alias: {
      "@fonts": abs("./src/assets/fonts/"),
      "@node_modules": abs("./node_modules/"),
    },
  } as Configuration["resolve"],

  HtmlBundlerPluginConfig: {
    entry: {
      index: abs("./src/views/pages/index.hbs"),
      "404": abs("./src/views/pages/404.hbs"),
      comm: abs("./src/views/pages/comm.hbs"),
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
  } as HtmlBundlerPlugin.PluginOptions,

  plugins: [
  ] as unknown as webpack.DefinePlugin[],

  moduleRules: [
    {
      test: /\.ts$/,
      use: {
        loader: "ts-loader",
        options: {
          configFile: abs("./config/tsconfig.web.json"),
        },
      },
      exclude: /node_modules/,
    },
    {
      test: /\.woff2$/,
      type: "asset/resource",
      generator: {
        filename: "[hash:6][ext]",
      },
    },
  ] as RuleSetRule[],
}