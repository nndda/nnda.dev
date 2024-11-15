import path from "path";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
const { FaviconsBundlerPlugin } = require("html-bundler-webpack-plugin/plugins");
import CopyPlugin from "copy-webpack-plugin";

function abs(path_string : string): string {
  return path.resolve(__dirname, path_string);
}

function copyToDist(file_path : string): CopyPlugin.Pattern {
  return { from: abs("src/" + file_path), to: abs("dist/") }
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
        "404": abs("src/views/404.hbs"),
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
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "[hash:2]/[hash:7][ext][query]",
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