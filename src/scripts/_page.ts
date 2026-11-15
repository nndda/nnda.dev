import { initIcons } from "./runtime";

const d = document;

import init from "./main";
init(d);

if (window.location.pathname.startsWith("/blog/")) {
  initIcons(
    "global-links",
    (await import("./build/icons/global-links")).default,
  );
}
