import {
  createResolver,
  pathResolve,
  readTextFile,
  writeTextFile,
  type DirResolver,
} from "../scripts/build/utils";

import {
  minify as minifyHTML,
} from "@swc/html";

import type {
  TransformOutput,
} from "@swc/html/binding";

const
  abs: DirResolver = createResolver(__dirname)
, distDir: string = pathResolve(abs("../../dist/"))
;

for ( const htmlFile of [
    "index.html",
    "shop.html",
    "404.html",
    "comm.html",
] as string[] ) {
  const
    htmlPath: string = pathResolve(distDir, htmlFile)
  ;

  minifyHTML(readTextFile(htmlPath), {
    collapseBooleanAttributes: true,
    // collapseWhitespaces: "all",
    filename: htmlFile,
    minifyCss: true,
    minifyJs: true,
    minifyJson: true,
    quotes: false,
    removeComments: true,
    removeRedundantAttributes: "all",
  }).then((val: TransformOutput) => {
    writeTextFile(htmlPath, val.code);
  });
}
