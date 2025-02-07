import { entries, shuffle } from "lodash";
import {
  writeTextFile,
  cleanupDir,
  createResolver,
  type DirResolver
} from "./utils";
const abs: DirResolver = createResolver(__dirname);

const packageJSON: any = require("../../../package.json");

cleanupDir(abs("./"));

writeTextFile(abs("./packages.json"), JSON.stringify(shuffle([
  ...entries(packageJSON.devDependencies).map(i => i[0] + "pkg-d"),
  ...entries(packageJSON.dependencies).map(i => i[0] + "pkg-r"),
])));

