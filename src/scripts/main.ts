import { importLazy, loadCSS } from "./framework";

import initializeInputs from "./input";
import styleFooter from "../styles/sections/_footer.lazy.scss?url";

import initIcon from "./build/icons/global";
       initIcon();

export default function (d: Document) {
  const
    navbarClasses: DOMTokenList = d.getElementById("navbar")!.classList
  , collapseArea: HTMLElement = d.getElementById("collapse-area")!
  ;

  d.getElementById("navbar-button")!.addEventListener("click", (): void => {
    navbarClasses.add("toggled");
    collapseArea.classList.remove("hidden-o");
  });

  function closeMobileNavbar() {
    navbarClasses.remove("toggled");
    collapseArea.classList.add("hidden-o");
  }


  d.getElementById("navbar-collapse")!.addEventListener("click", closeMobileNavbar);
  collapseArea.addEventListener("click", closeMobileNavbar);


  for (const navLink of d.querySelectorAll("#navbar .nav-link")) {
    navLink.addEventListener("click", closeMobileNavbar);
  }


  initializeInputs(d);


  importLazy(
    [
      () => import("./sections/footer"),
      () => loadCSS(styleFooter),
    ],
    d.querySelector("body > footer")!,
    "300px",
  );
}
