import { importLazy, initIcons, loadCSS } from "./framework";

const
  d = document
;

import init from "./main";
init(d);

import icons from "./build/icons/home";
initIcons("home", icons);

import initScroll from "./scroll.home";
initScroll(d);


import styleOverview from "../styles/sections/_overview.lazy.scss?url";

importLazy(
  d.getElementById("overview")!,
  "25px",
  () => import("./sections/overview"),
  () => loadCSS(styleOverview),
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
