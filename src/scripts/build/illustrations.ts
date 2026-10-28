console.log("Updating illustrations data...");

import illustHomeDataPromise from "../../data/illustrations/home";

import { FS, Path } from "@dev/util";
import { join } from "path";

const illustPaths = ( await illustHomeDataPromise ).illustrations.reduce((prev, gall) => {
  return [
    ... prev,
    ... gall.items.map(illust => Path.abs(join("./src/", illust.src))),
  ];
}, [] as string[]);

illustPaths.reverse();

FS.write.text(Path.abs("./src/data/illustrations/out/home.ts"), `${
    illustPaths.map((src, i) => `import i${i} from "${src}"`).join(";")
  };export default [${illustPaths.map((_, i) => `i${i}`).join(",")}]
`);

console.log("Finished updating illustrations data...");
