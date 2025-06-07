import initializeInputs from "./input";

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

  window.importLazy( d,
    (): Promise<any> => import("./sections/footer"),
    d.querySelector("body > footer") as HTMLElement,
    "80px",
  );

}
