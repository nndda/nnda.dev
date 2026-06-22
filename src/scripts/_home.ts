import { importLazy, loadCSS } from "./framework";

const
  d = document
;

import init from "./main";
init(d);

import initIcon from "./build/icons/home";
initIcon();

import initScroll from "./scroll.home";
initScroll(d);


import styleOverview from "../styles/sections/_overview.lazy.scss?url";


importLazy(
  [
    () => import("./sections/overview"),
    () => loadCSS(styleOverview),
  ],
  d.getElementById("overview")!,
  "25px",
);


import styleProjects from "../styles/sections/_projects.lazy.scss?url";

importLazy(
  [
    () => import("./sections/projects"),
    () => loadCSS(styleProjects),
  ],
  d.getElementById("projects")!,
  "180px",
);


import styleIllustrations from "../styles/sections/_illustrations.lazy.scss?url";

importLazy(
  [
    () => import("./sections/illustrations"),
    () => loadCSS(styleIllustrations),
  ],
  d.getElementById("illustrations")!,
  "200px",
);


import styleLinks from "../styles/sections/_links.lazy.scss?url";

importLazy(
  [
    () => import("./sections/links"),
    () => loadCSS(styleLinks),
  ],
  d.getElementById("links")!,
  "200px",
);
