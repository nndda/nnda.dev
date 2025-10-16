import {
  statSync,
  type Stats,
} from "fs";
import {
  extname,
  relative,
} from "path"

import {
  ls,
  pathResolve,
  createResolver,
  type DirResolver,
} from "../scripts/build/utils"

console.log("Scanning for Handlebars partials...")

const
  abs: DirResolver = createResolver(__dirname)
, partialsPath: string = abs("./partials/")
, reHbs: RegExp = new RegExp("\.hbs$")

, partialsObj: Record<string, string> = {}
;

function processPartialDir(pathBase: string, dirs: string[] = []): void {
  for (const path of ls(pathBase)) {
    const
      pathAbs: string = pathResolve(partialsPath, ...dirs, path)
    , pathStat: Stats = statSync(pathAbs)
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
