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
}, exists(siteExtPath) ? (await import(siteExtPath)).default : {} );};
// 
import {
  exists,
  createResolver,
} from "../../scripts/build/utils";
import _ from "lodash";

const
  siteExtPath: string = createResolver(__dirname)("./home.ext.js")
;

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
