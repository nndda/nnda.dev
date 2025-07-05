import initializeInputs from "./input";
import styleFooter from "../styles/sections/_footer.lazy.scss?url";

export default function (d: Document): void {

  const
    navbarMobile: HTMLElement = d.getElementById("navbar-mobile") as HTMLElement
  , navbarButton: HTMLElement = d.getElementById("navbar-button") as HTMLButtonElement
  , navbarCollapseArea: HTMLElement = d.getElementById("collapse-trigger-area") as HTMLElement

  ;

  function toggleNavMobile(): void {
    navbarMobile.classList.toggle("collapsed");
    navbarCollapseArea.classList.toggle("hidden");
  }

  navbarMobile.querySelectorAll(".nav-link").forEach(el => {
    el.addEventListener("click", toggleNavMobile);
  });

  navbarButton.addEventListener("click", toggleNavMobile);
  navbarCollapseArea.addEventListener("click", toggleNavMobile);

  initializeInputs(d);

  window.importLazy(
    [
      (): Promise<any> => import("./sections/footer"),
      (): Promise<any> => window.loadCSS(styleFooter),
    ],
    d.querySelector("body > footer") as HTMLElement,
    "300px",
  );

}
