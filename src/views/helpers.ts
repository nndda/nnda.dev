import Handlebars from "handlebars";
import { readFileSync } from "fs";
import { imageSize } from "image-size";
import type { ISizeCalculationResult } from 'image-size/dist/types/interface';

import path from "path";

import {
  ls, // eslint-disable-line
  exists,
  pathResolve,
  createResolver,
} from "../scripts/build/utils";
import _ from "lodash";
const sortBy = _.sortBy; // eslint-disable-line
const srcDir: string = createResolver(__dirname)("../../src/");

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

  preloadFont: (file: string) => {
    return new Handlebars.SafeString(`
      <link
        rel="preload"
        href="${file}"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      >
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
    , dimensions: ISizeCalculationResult = imageSize(readFileSync(srcAbs))
    ;

    if (!exists(srcAbs)) { throw Error(`Image ${path.basename(src)} doesn't exists`); }

    return new Handlebars.SafeString(`
      <img src="${src}" width="${dimensions.width}" height="${dimensions.height}" loading="lazy" alt="">
    `);
  },
}