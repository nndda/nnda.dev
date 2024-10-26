import path from "path";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
const { FaviconsBundlerPlugin } = require("html-bundler-webpack-plugin/plugins");
import CopyPlugin from "copy-webpack-plugin";

function abs(path_string : string): string {
  return path.resolve(__dirname, path_string);
}

module.exports = {
  mode: "production",

  output: {
    path: abs("dist"),
    crossOriginLoading: "anonymous",
  },

  resolve: {
    extensions: [".js", ".ts"],
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("src/views/index.hbs"),
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
        // {
        //   test: /\.s?css$/,
        //   as: "style",
        // },
        {
          test: /\.(ttf|woff2?)$/,
          as: "font",
          rel: "prefetch",
          attributes: { crossorigin: true },
        },
        {
          test: /\.(png|webp|svg)$/,
          as: "image",
          rel: "prefetch",
        },
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
      enabled: "auto",
      faviconOptions: {
        path: "/",
        icons: {
          favicons: true,
        },
      },
    }),

    new CopyPlugin({
      patterns: [
        { from: abs("src/misc/_headers"), to: abs("dist/") },
        { from: abs("src/misc/ai.txt"), to: abs("dist/") },
        { from: abs("src/misc/robots.txt"), to: abs("dist/") },
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
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[hash:6][ext][query]",
        },
      },
      {
        test: /\.(woff2|woff)$/,
        type: "asset/resource",
        generator: {
          filename: "[hash:6][ext]",
        },
      },
    ],
  },
};