import { resolve } from "path";
import { FS, Path } from "@dev/util";
import { minify, type Options } from "@swc/html";

const
  distDir = Path.abs("./dist/")

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
  const htmlPath = resolve(distDir, htmlFile);

  console.log(`minifying '${htmlFile}'...`);

  FS.write.text(htmlPath, (
    await minify(
      FS.read.text(htmlPath), {
        ... conf,
        filename: htmlFile,
      }
    )
  ).code);
}
