console.log("Updating attribution/acknowledgment data...")

import { FS, Path } from "@dev/util";
const relative = Path.createRelative(import.meta.dir);
import _ from "lodash";

import packageJSON from "../../../package.json";

FS.write.text(relative("./out/attribution.json"), JSON.stringify(_.sortBy([

  ..._.entries(packageJSON.devDependencies).map(i => i[0] + "1"),

  ...FS.read.text(Path.abs("./config/requirements.txt"))
    .split("\n")
    .map(i => i.split("==")[0] + "2"),

  ...[
    "googlefonts/zen-kakugothic",
    "canonical/Ubuntu-Sans-Mono-fonts",
    "IBM/plex",
    "SAWARATSUKI/KawaiiLogos",
  ].map(i => i + "3"),

  ...[
    "css-loaders.com"
  ],

])));

console.log("Finished updating attribution/acknowledgment data");
