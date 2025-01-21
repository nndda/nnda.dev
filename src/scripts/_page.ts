export {};
const d: Document = document;

import "./build/g";

import { init } from "./main";
init(d);

import { initScroll } from "./scroll";
initScroll(d);
