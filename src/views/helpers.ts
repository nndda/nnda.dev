import Handlebars from "handlebars";
import sizeOf from "image-size";
import type { ISizeCalculationResult } from 'image-size/dist/types/interface';

import path from "path";

import {
  ls, // eslint-disable-line
  exists,
  pathResolve,
  createResolver,
} from "../scripts/build/utils.ts";
import _ from "lodash";
const sortBy = _.sortBy; // eslint-disable-line
const srcDir: string = createResolver(import.meta)("../../src/");

function srcResolve(src: string): string {
  return pathResolve(srcDir, "./" + src);
}

export default {
  icon: (group: string, name: string) => {
    return `
      <i class="${group}" data-i="${name}"></i>
    `;
  },

  meta: (name: string, content: string) => {
    return new Handlebars.SafeString(`
      <meta name="${name}" content="${content}">
    `);
  },

  stylesheet: (file: string, media: string = "") => {
    return new Handlebars.SafeString(`
      <link rel="stylesheet" type="text/css" href="${file}" ${media !== "" ? `media="${media}"` : ``}>
    `);
  },

  script: (file: string, defer: boolean = false) => {
    return new Handlebars.SafeString(`
      <script type="text/javascript" src="${file}" ${defer ? `defer=""` : ""}></script>
    `);
  },

  title: (title: string = "") => {
    if (title === "") return "";

    return new Handlebars.SafeString(`
      <title>${title}</title>
      <meta name="title" content="${title}">
      <meta property="og:title" content="${title}">
    `);
  },

  desc: (desc: string = "") => {
    if (desc === "") return "";

    return new Handlebars.SafeString(`
      <meta name="description" content="${desc}">
      <meta property="og:description" content="${desc}">
    `);
  },

  img: (src: string) => {
    const
      srcAbs: string = srcResolve(src)
    , imgdata: ISizeCalculationResult = sizeOf(srcAbs)
    ;

    if (!exists(srcAbs)) { throw Error(`Image ${path.basename(src)} doesn't exists`); }

    return new Handlebars.SafeString(`
      <img src="${src}" width="${imgdata.width}" height="${imgdata.height}" loading="lazy" alt="">
    `);
  },
}