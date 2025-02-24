import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import { type Configuration } from "webpack";

import _ from "lodash";
import common from "./webpack.common.ts";

export default {
  mode: "development",

  resolve: common.resolve,

  plugins: [
    ...common.plugins,

    new HtmlBundlerPlugin(_.merge(common.HtmlBundlerPluginConfig, { hotUpdate: true })),
  ],

  devServer: {
    watchFiles: {
      paths: ["./src/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },

  module: {
    rules: [
      ...common.moduleRules,
      {
        test: /\.(ico|png|jp?g|webp|avif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: '[name].[hash:6][ext][query]',
        },
      },
    ],
  },
} as Configuration;