console.log("Updating illustrations data...");

import illustHomeDataPromise, {
  type IllustGallery,
  type IllustItem,
} from "../../data/illustrations/home";

import {
  writeTextFile,
  createResolver,
  resolveRelative,
  type DirResolver,
} from "./utils";

import { readFileSync } from "fs";
import _ from "lodash";
import { imageSize } from "image-size";
import type { ISizeCalculationResult } from "image-size/types/interface";

const
  abs: DirResolver = createResolver(__dirname)
, dirOut: string = abs("./out/")
, srcResolve: DirResolver = createResolver(abs("../../"))
, illustPaths: Record<string, string> = {}
;

illustHomeDataPromise.then((illustHomeData: { illustrations: IllustGallery[] }) => {
  const illustHome: IllustGallery[] = illustHomeData.illustrations.map((gall: IllustGallery, iG: number): IllustGallery => {
    return {
      col: gall.col,
      items: gall.items.map((illustItem: IllustItem, iI: number): IllustItem => {
        const
          id: string = `i${iG}${iI}`
        , srcAbs: string = srcResolve("./" + illustItem.src)
        , dimensions: ISizeCalculationResult = imageSize(readFileSync(srcAbs))
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


  writeTextFile(abs("./out/illust.home.js"), `${
      Object.entries(illustPaths).map((val: [string, string]): string => {
        return `import ${val[0]} from "${resolveRelative(dirOut, val[1])}";`;

      }).join("\n")
    }\nexport default ${
      JSON.stringify(illustHome).replace(/"src":\s*"(\w+)"/g, `"src":$1`)
    };
  `);

  console.log("Finished updating illustrations data...");
});



