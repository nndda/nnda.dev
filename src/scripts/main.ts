import { importLazy, loadCSS } from "./framework";

import initializeInputs from "./input";
import styleFooter from "../styles/sections/_footer.lazy.scss?url";

import initIcon from "./build/icons/global";
       initIcon();

export default function (d: Document): void {
  const
    navbarClasses: DOMTokenList = (d.getElementById("navbar") as HTMLElement).classList
  , collapseArea: HTMLElement = (d.getElementById("collapse-area") as HTMLElement)
  ;

  (d.getElementById("navbar-button") as HTMLButtonElement).addEventListener("click", (): void => {
    navbarClasses.add("toggled");
    collapseArea.classList.remove("hidden-o");
  });

  function closeMobileNavbar(): void {
    navbarClasses.remove("toggled");
    collapseArea.classList.add("hidden-o");
  }

  (d.getElementById("navbar-collapse") as HTMLButtonElement).addEventListener("click", closeMobileNavbar);
  collapseArea.addEventListener("click", closeMobileNavbar);

  for (const navLink of d.querySelectorAll("#navbar .nav-link")) {
    navLink.addEventListener("click", closeMobileNavbar);
  }

  initializeInputs(d);

  importLazy(
    [
      (): Promise<any> => import("./sections/footer"),
      (): Promise<any> => loadCSS(styleFooter),
    ],
    d.querySelector("body > footer") as HTMLElement,
    "300px",
  );
}
