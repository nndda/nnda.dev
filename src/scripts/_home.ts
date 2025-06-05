export {};
const d: Document = document;

import init from "./main";
init(d);

import initIcon from "./build/icons/global";
initIcon();

import initScroll from "./scroll.home";
initScroll(d);

window.importLazy( d,
  (): Promise<any> => import("./sections/overview"),
  d.getElementById("overview") as HTMLElement,
  "25px",
);
