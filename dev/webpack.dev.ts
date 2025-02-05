import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import { type Configuration } from "webpack";

import { merge } from "lodash";
import common from "./webpack.common";

export default {
  mode: "development",

  resolve: common.resolve,

  plugins: [
    new HtmlBundlerPlugin(merge(common.HtmlBundlerPluginConfig, { hotUpdate: true })),
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
      },
    ],
  },
} as Configuration;