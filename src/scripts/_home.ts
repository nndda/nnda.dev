export {};
const d: Document = document;

import "./build/icons/global";

import init from "./main";
init(d);

import initScroll from "./scroll.home";
initScroll(d);

window.importLazy( d,
  (): Promise<any> => import("./sections/overview"),
  d.getElementById("overview") as HTMLElement,
);
