export {};
const d: Document = document;

import init from "./main";
init(d);

import initIcon from "./build/icons/global";
initIcon();

import initScroll from "./scroll.home";
initScroll(d);


import style from "../styles/sections/_overview.lazy.scss?url";

window.importLazy(
  [
    (): Promise<any> => import("./sections/overview"),
    (): Promise<any> => window.loadCSS(style),
  ],
  d.getElementById("overview") as HTMLElement,
  "25px",
);


window.importLazy(
  [
    (): Promise<any> => import("./sections/projects"),
  ],
  d.getElementById("projects") as HTMLElement,
  "150px",
);

window.importLazy(
  [
    (): Promise<any> => import("./sections/illustrations"),
  ],
  d.getElementById("illustrations") as HTMLElement,
  "175px",
);

window.importLazy(
  [
    (): Promise<any> => import("./sections/links"),
  ],
  d.getElementById("links") as HTMLElement,
  "120px",
);
