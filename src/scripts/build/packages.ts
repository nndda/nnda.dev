import _ from "lodash";
import {
  writeTextFile,
  readTextFile,
  createResolver,
  type DirResolver
} from "./utils";
const abs: DirResolver = createResolver(__dirname);

import packageJSON from "../../../package.json";

writeTextFile(abs("./packages.json"), JSON.stringify(_.shuffle([

  ..._.entries(packageJSON.devDependencies).map(i => i[0] + "pkg-d"),
  ..._.entries(packageJSON.dependencies).map(i => i[0] + "pkg-r"),

  ...readTextFile(abs("../../../config/requirements.txt"))
    .split("\n")
    .map(i => i.split("==")[0] + "pythn"),

  ...[
    "SAWARATSUKI/KawaiiLogos"
  ].map(i => i + "   gh"),

  ...[
    "css-loaders.com"
  ],

])));

