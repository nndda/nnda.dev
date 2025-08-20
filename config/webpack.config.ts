import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import { type Configuration } from "webpack";

import _ from "lodash";
import common, { abs, copyToDist } from "./webpack.common";

import CopyPlugin from "copy-webpack-plugin";
// import { FaviconsBundlerPlugin } from "html-bundler-webpack-plugin/plugins";

import cssnano from "cssnano";
import autoprefixer from "autoprefixer";

export default {
  mode: "production",

  output: {
    path: abs("./dist"),
    crossOriginLoading: "anonymous",
  },

  resolve: common.resolve,

  plugins: [
    ...common.plugins,

    new HtmlBundlerPlugin(_.merge(common.HtmlBundlerPluginConfig, {
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
    })),

    // new FaviconsBundlerPlugin({
    //   enabled: true,
    //   faviconOptions: {
    //     path: "/",
    //     icons: {
    //       favicons: true,
    //       android: false,
    //       appleIcon: false,
    //       appleStartup: false,
    //       windows: false,
    //       yandex: false,
    //     },
    //   },
    // }),

    new CopyPlugin({
      patterns: [
        copyToDist("misc/_headers"),
        copyToDist("misc/_redirects"),
        copyToDist("misc/ai.txt"),
        copyToDist("misc/robots.txt"),
        copyToDist("assets/NNDA_ASSET_LICENSE.txt"),
      ],
    }),
  ],

  module: {
    rules: [
      ...common.moduleRules,
      {
        test: /\.(ico|png|jp?g|webp|avif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "[hash:6][ext][query]",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  cssnano({ preset: "default", }),
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
} as Configuration;