import { importLazy, initIcons, loadCSS } from "@runtime";

const d = document;

import init from "./main";
init(d);

import icons from "./build/icons/home";
initIcons("home", icons);

const
  illustContStyle = (d.querySelector(".illust-cont > img") as HTMLElement).style
, passiveEvOpt: AddEventListenerOptions = { passive: true, }
;

let scrollRatio = 0
,   windowHeight = 0
;

function scrollTransform() {
  illustContStyle.translate = `0 -${scrollRatio * 230}px`;
}

function resizeEv() {
  windowHeight = innerHeight;
}

function scrollEv() {
  scrollRatio = scrollY / windowHeight;

  if (scrollRatio <= 1) {
    requestAnimationFrame(scrollTransform);
  }
}

resizeEv();
scrollEv();

addEventListener("resize", resizeEv, passiveEvOpt);
addEventListener("scroll", scrollEv, passiveEvOpt);

// import styleOverview from "../styles/sections/_overview.lazy.scss?url";
//
// importLazy(
//   d.getElementById("overview")!,
//   "25px",
//   () => import("./sections/overview"),
//   () => loadCSS(styleOverview),
// );


import styleBlog from "../styles/sections/_blog.lazy.scss?url";

importLazy(
  d.getElementById("blog")!,
  "200px",
  () => import("./sections/blog"),
  () => loadCSS(styleBlog),
);


import styleProjects from "../styles/sections/_projects.lazy.scss?url";

importLazy(
  d.getElementById("projects")!,
  "180px",
  () => import("./sections/projects"),
  () => loadCSS(styleProjects),
);


import styleIllustrations from "../styles/sections/_illustrations.lazy.scss?url";

importLazy(
  d.getElementById("illustrations")!,
  "200px",
  () => import("./sections/illustrations"),
  () => loadCSS(styleIllustrations),
);


import styleLinks from "../styles/sections/_links.lazy.scss?url";

importLazy(
  d.getElementById("links")!,
  "200px",
  () => import("./sections/links"),
  () => loadCSS(styleLinks),
);
