console.log("Updating attribution/acknowledgment data...")

import { FS, Path } from "@dev/util";
import { resolve } from "path";

import packageJSON from "../../../package.json";

const
  credits = {
    npm: [
      ...Object.keys({...packageJSON.devDependencies, ...packageJSON.dependencies}),
    ],
    pypi: [
      ...FS.read.text(Path.abs("./config/requirements.txt"))
        .split("\n")
        .filter(n => n !== "")
        .map(n => n.split("==")[0]),
    ],
    gh: [
      "googlefonts/zen-kakugothic",
      "canonical/Ubuntu-Sans-Mono-fonts",
      "IBM/plex",
      "SAWARATSUKI/KawaiiLogos",
    ],
    others: [
      "css-loaders.com",
    ],
  }
, pkgs = Object.keys(credits)
;

FS.write.text(resolve(import.meta.dir, "./out/attribution.json"), JSON.stringify([
  pkgs.length,

  ...pkgs
    .map(pkg => credits[pkg].length)
    .reduce(({ sum, arr }, len ) => {

      sum += len;
      arr.push(sum);

      return { sum, arr };
    }, { sum: 0, arr: [] as number[] }).arr,

  ...pkgs
    .reduce((prev, pkg) => {
      prev.push(...credits[pkg]);
      return prev;
    }, [] as string[]),
]));

console.log("Finished updating attribution/acknowledgment data");
