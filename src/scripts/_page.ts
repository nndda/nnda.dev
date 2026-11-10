export {};
const d = document;

import init from "./main";
init(d);

import icons from "./build/icons/global";
initIcons("global", icons);

import initScroll from "./scroll";
import { initIcons } from "./runtime";
initScroll(d);
