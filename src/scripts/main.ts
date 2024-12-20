const d = document;

import { initializeScrollspy } from "./scrollspy";
import { initializeInputs } from "./input";

d.addEventListener("DOMContentLoaded", () => {
  initializeScrollspy(d);

  const
    navbarMobile = <HTMLElement>d.getElementById("navbar-mobile"),
    navbarButton = <HTMLButtonElement>d.getElementById("navbar-button"),
    navbarCollapseArea = <HTMLElement>d.getElementById("collapse-trigger-area");

  function toggleNavMobile(): void {
    navbarMobile.classList.toggle("collapsed");
    navbarCollapseArea.classList.toggle("hidden");
  }

  navbarMobile.querySelectorAll(".nav-link").forEach((elem) => {
    elem.addEventListener("click", toggleNavMobile);
  });

  navbarButton.addEventListener("click", toggleNavMobile);
  navbarCollapseArea.addEventListener("click", toggleNavMobile);

  initializeInputs(d);
});