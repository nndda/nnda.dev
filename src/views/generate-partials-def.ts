import { statSync } from "fs";
import { extname, relative, resolve } from "path";
import { FS, Path } from "@dev/util";

console.log("Scanning for Handlebars partials...")

const
  partialsPath: string = Path.abs("./src/views/partials/")
, reHbs: RegExp = /\.hbs$/
, partialsObj: Record<string, string> = {}
;

function processPartialDir(pathBase: string, dirs: string[] = []) {
  for (const path of FS.ls(pathBase)) {
    const
      pathAbs = resolve(partialsPath, ...dirs, path)
    , pathStat = statSync(pathAbs)
    ;

    if (pathStat.isDirectory()) {
      processPartialDir(pathAbs, [...dirs, path]);

    } else if (pathStat.isFile() && extname(pathAbs) === ".hbs") {
      partialsObj[relative(partialsPath, pathAbs).replace(reHbs, "")] = pathAbs;

    }
  }
}

processPartialDir(partialsPath);

console.log(`Found ${Object.keys(partialsObj).length} partials.`);

export default partialsObj;
