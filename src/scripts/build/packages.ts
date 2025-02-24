import _ from "lodash";
import {
  writeTextFile,
  cleanupDir,
  createResolver,
  type DirResolver
} from "./utils.ts";
const abs: DirResolver = createResolver(import.meta);

import packageJSON from "../../../package.json" with { type: "json" };

cleanupDir(abs("./"));

writeTextFile(abs("./packages.json"), JSON.stringify(_.shuffle([
  ..._.entries(packageJSON.devDependencies).map(i => i[0] + "pkg-d"),
  ..._.entries(packageJSON.dependencies).map(i => i[0] + "pkg-r"),
])));

