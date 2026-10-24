console.log("Updating illustrations data...");

import illustHomeDataPromise, {
  type IllustGallery,
  type IllustItem,
} from "../../data/illustrations/home";

import _ from "lodash";
import { imageSize } from "image-size";
import type { ISizeCalculationResult } from "image-size/types/interface";

import { FS, Path } from "@dev/util";
import { resolve } from "path";
const relative = Path.createRelative(import.meta.dir);

const
  dirOut = relative("./out/")
, illustPaths: Record<string, string> = {}
;

illustHomeDataPromise.then((illustHomeData: { illustrations: IllustGallery[] }) => {
  const illustHome: IllustGallery[] = illustHomeData.illustrations.map((gall: IllustGallery, iG: number): IllustGallery => {
    return {
      col: gall.col,
      items: gall.items.map((illustItem: IllustItem, iI: number): IllustItem => {
        const
          id: string = `i${iG}${iI}`
        , srcAbs: string = Path.abs("./src/" + illustItem.src)
        , dimensions: ISizeCalculationResult = imageSize(FS.read.buffer(srcAbs))
        ;

        illustPaths[id] = srcAbs;

        return _.merge(illustItem, {
          src: id,
          w: dimensions.width,
          h: dimensions.height,
        } as IllustItem);
      }),
    };
  });


  FS.write.text(relative("./out/illust.home.js"), `${
      Object.entries(illustPaths).map((val: [string, string]): string => {
        return `import ${val[0]} from "${resolve(dirOut, val[1])}";`;

      }).join("\n")
    }\nexport default ${
      JSON.stringify(illustHome).replace(/"src":\s*"(\w+)"/g, `"src":$1`)
    };
  `);

  console.log("Finished updating illustrations data...");
});
