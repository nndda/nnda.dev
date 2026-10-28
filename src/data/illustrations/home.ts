// 'src' path relatives to ./src

import type { IllustrationGallery } from "../../scripts/sections/illustrations";

const DATA = async (): Promise<{ illustrations: IllustrationGallery[]; }> => { return _.merge({
  illustrations: [
    // {
    //   type: "landscape",
    //   items: [
    //     {
    //       title: "Illustration #1",
    //       chr: [
    //         "Dia",
    //         "Ritsu",
    //       ],
    //       src: illust1,
    //     },
    //   ],
    // },
  ]
}, FS.exists(siteExtPath) ? (await import(siteExtPath)).default : {} );};

import { resolve } from "path";
import { FS } from "@dev/util";
import _ from "lodash";

const siteExtPath = resolve(import.meta.dir, "./home.ext.js");

export default DATA();
