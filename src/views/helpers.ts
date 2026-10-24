import { readFileSync } from "fs";
import { basename, join } from "path";
import { FS, Path } from "@dev/util";
import Handlebars from "handlebars";
import { imageSize } from "image-size";
// import type { ISizeCalculationResult } from "image-size/types/interface";

// import _ from "lodash";
// const sortBy = _.sortBy; // eslint-disable-line

export default {
  icon: (group: string, name: string, width: number = -1, height: number = -1) => {
    return `
      <svg class="${group}" data-i="${name}" ${
      width === -1 ? "" : `width="${width}" height="${height === -1 ? width : height
      }"`}></svg>
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

  img: (src: string, alt: string) => {
    const srcAbs: string = Path.abs(join("./src/", src));

    if (!FS.exists(srcAbs)) { throw Error(`Image ${basename(src)} doesn't FS.exists`); }

    const dimensions: any = imageSize(readFileSync(srcAbs));

    return new Handlebars.SafeString(`
      <img src="${src}" width="${dimensions.width}" height="${dimensions.height}" loading="lazy" alt="${alt}">
    `);
  },
}
