import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import { FaviconsBundlerPlugin } from "html-bundler-webpack-plugin/plugins";

import CopyPlugin from "copy-webpack-plugin";

import handlebarsData from "./src/views/data";
import handlebarsHelpers from "./src/views/helpers";

import { buildProjectPages, projectEntries } from "./src/_projects/project-pages";

import { type Configuration } from "webpack";

import { createResolver, type DirResolver } from "./src/scripts/build/utils";
const abs: DirResolver = createResolver(__dirname);

buildProjectPages();

function copyToDist(file_path: string): CopyPlugin.Pattern {
  return { from: abs("./src/" + file_path), to: abs("./dist/") }
}

export default {
  mode: "production",

  output: {
    path: abs("./dist"),
    crossOriginLoading: "anonymous",
  },

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@fonts": abs("node_modules/@fontsource/")
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

      js: {
        filename: "[contenthash:6].js",
      },
      css: {
        filename: "[contenthash:6].css",
      },

      preload: [
        {
          test: /(fonts)\.s?css$/,
          as: "style",
        },
        {
          test: /\.woff2$/,
          as: "font",
          attributes: { crossorigin: true },
        },
        // {
        //   test: /\.(png|webp|svg)$/,
        //   as: "image",
        //   rel: "prefetch",
        // },
      ],

      minify: true,
      minifyOptions: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },

      integrity: "auto",
    }),

    new FaviconsBundlerPlugin({
      enabled: true,
      faviconOptions: {
        path: "/",
        icons: {
          favicons: true,
          android: false,
          appleIcon: false,
          appleStartup: false,
          windows: false,
          yandex: false,
        },
      },
    }),

    new CopyPlugin({
      patterns: [
        copyToDist("misc/_headers"),
        copyToDist("misc/_redirects"),
        copyToDist("misc/ai.txt"),
        copyToDist("misc/robots.txt"),
      ],
    }),
  ],

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
        generator: {
          filename: "[hash:2]/[hash:7][ext][query]",
        },
      },
      {
        test: /\.woff2$/,
        type: "asset/resource",
        generator: {
          filename: "[hash:6][ext]",
        },
      },
    ],
  },
} as Configuration;