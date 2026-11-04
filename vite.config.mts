import { relative, resolve } from 'path';
import type { UserConfig } from 'vite';

import tsconfig from "./tsconfig.json" with {type: "json"};

const aliasObj = [
  ... Object
    .entries(tsconfig.compilerOptions.paths)
    .reduce(
      ( prev, [ alias, pathArr ] ) => {
        if (alias === "@dev/util") {
          return prev;
        }

        function removeAst(str: string) {
          return str.replace(/\*/, "");
        }

        return [
          ...prev,

          (
            alias.endsWith("*") ?
            {
              find: new RegExp(removeAst(alias).replaceAll(/\//g, "\\/") + "(.+)"),
              replacement: removeAst(resolve(import.meta.dirname, pathArr[0])) + "$1",
            } :
            {
              find: alias,
              replacement: resolve(import.meta.dirname, pathArr[0]),
            }
          ),
        ];
      },
      [] as any[],
    )
];

function abs(path: string) {
  return resolve(import.meta.dirname, path);
}

const root = abs("./src/pages/");

console.log("Targetting", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {

}

export default {
  root,
  publicDir: abs("./src/public/"),

  input: {
    main: "./index.html",
    "404": "./404.html",
  },

  build: {
    assetsInlineLimit: 0,

    emptyOutDir: true,
    outDir: relative(root, abs("./dist/")),

    // reportCompressedSize: false,

    rolldownOptions: {
      output: {
        strict: true,
        cleanDir: true,
        chunkFileNames: "[hash:6].js",
        entryFileNames: "[hash:6].js",

        assetFileNames(assets): string {
          if (assets.originalFileNames.length > 0) {
            if (assets.originalFileNames[0].endsWith(".woff2")) {
              return "fonts/[hash:6][extname]";
            }
          }

          return "[hash:6][extname]";
        },
      },
    },
  },

  appType: "mpa",

  resolve: {
    alias: aliasObj,
  },

  server: {
    port: 2604,
  }
} satisfies UserConfig;
