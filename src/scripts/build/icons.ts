// BUILD SCRIPT

import {
  writeTextFile,
  createResolver,
  type DirResolver,
} from "./utils";
const abs: DirResolver = createResolver(__dirname);

import {
  icon,
  type IconName,
  type IconLookup,
} from "@fortawesome/fontawesome-svg-core";

import {
  faCaretDown,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function toHTML(name: IconName | IconLookup): string {
  return icon(name).html.join();
}

function clearAndUpper(str: string) {
  return str.replace(/-/, "").toUpperCase();
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, clearAndUpper);
}

writeTextFile(abs("../icons.js"),
  [faCaretDown, faX].map(ico => {
    return `export const icon${toPascalCase(ico.iconName)}=\`${toHTML(ico)}\``;
  }).join(";")
);