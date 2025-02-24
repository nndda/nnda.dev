import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import webpack from "webpack";
import type { Configuration, RuleSetRule } from "webpack";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import CopyPlugin from "copy-webpack-plugin";
export function copyToDist(path: string): CopyPlugin.Pattern {
  return { from: abs("./src/" + path), to: abs("./dist/") }
}

import handlebarsData from "../src/views/data.ts";
import handlebarsHelpers from "../src/views/helpers.ts";

import { buildProjectPages, projectEntries } from "../src/_projects/project-pages.ts";
buildProjectPages();

import {
  pathResolve,
  createResolver,
} from "../src/scripts/build/utils.ts";
const absRel: string = createResolver(import.meta)("../");
export function abs(path: string): string {
  return pathResolve(absRel, path);
}

export default {
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@fonts": abs("./node_modules/@fontsource/"),
      "@node_modules": abs("./node_modules/"),
    },
  } as Configuration["resolve"],

  HtmlBundlerPluginConfig: {
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
  } as HtmlBundlerPlugin.PluginOptions,

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ] as unknown as webpack.DefinePlugin[],

  moduleRules: [
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
      test: /\.woff2$/,
      type: "asset/resource",
      generator: {
        filename: "[hash:6][ext]",
      },
    },
  ] as RuleSetRule[],
}