import {
  createResolver,
  pathResolve,
  readTextFile,
  writeTextFile,
} from "../scripts/build/utils";

import {
  minify as minifyHTML,
  type Options,
} from "@swc/html";

const
  abs = createResolver(__dirname)
, distDir: string = pathResolve(abs("../../dist/"))
, conf: Options = {
    collapseBooleanAttributes: true,
    // collapseWhitespaces: "all",
    minifyCss: true,
    minifyJs: true,
    minifyJson: true,
    quotes: false,
    removeComments: true,
    removeRedundantAttributes: "all",
  }
;

// TODO: use glob instead
for ( const htmlFile of [
    "index.html",
    "shop.html",
    "404.html",
    "comm.html",
] ) {
  const
    htmlPath: string = pathResolve(distDir, htmlFile)
  ;

  console.log(`minifying '${htmlFile}'...`);

  minifyHTML(
    readTextFile(htmlPath), {
      ... conf,
      filename: htmlFile,
    }
  )
  .then(res => {
    writeTextFile(htmlPath, res.code);
  })
  ;
}
