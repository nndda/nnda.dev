export {};
const d: Document = document;

import init from "./main";
init(d);

// import initIcon from "./build/icons/global";
// initIcon();

import initScroll from "./scroll.home";
initScroll(d);


import styleOverview from "../styles/sections/_overview.lazy.scss?url";

window.importLazy(
  [
    (): Promise<any> => import("./sections/overview"),
    (): Promise<any> => window.loadCSS(styleOverview),
  ],
  d.getElementById("overview") as HTMLElement,
  "25px",
);


import styleProjects from "../styles/sections/_projects.lazy.scss?url";

window.importLazy(
  [
    (): Promise<any> => import("./sections/projects"),
    (): Promise<any> => window.loadCSS(styleProjects),
  ],
  d.getElementById("projects") as HTMLElement,
  "180px",
);


import styleIllustrations from "../styles/sections/_illustrations.lazy.scss?url";

window.importLazy(
  [
    (): Promise<any> => import("./sections/illustrations"),
    (): Promise<any> => window.loadCSS(styleIllustrations),
  ],
  d.getElementById("illustrations") as HTMLElement,
  "200px",
);


import styleLinks from "../styles/sections/_links.lazy.scss?url";

window.importLazy(
  [
    (): Promise<any> => import("./sections/links"),
    (): Promise<any> => window.loadCSS(styleLinks),
  ],
  d.getElementById("links") as HTMLElement,
  "200px",
);
