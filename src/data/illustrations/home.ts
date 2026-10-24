// 'src' path relatives to ./src

const DATA: any = async (): Promise<{ illustrations: IllustGallery[]; }> => { return _.merge({
  illustrations: [
    // {
    //   col: 2,
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

export interface IllustItem {
  title: string,
  chr: string[],
  src: string,
  w?: number,
  h?: number,
}

export interface IllustGallery {
  col: number,
  items: IllustItem[],
}

export default DATA();
