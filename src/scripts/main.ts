const d = document;

import { initializeScroll } from "./scroll";
import { initializeInputs } from "./input";

d.addEventListener("DOMContentLoaded", () => {
  initializeScroll(d);

  const
    navbarMobile = <HTMLElement>d.getElementById("navbar-mobile"),
    navbarButton = <HTMLButtonElement>d.getElementById("navbar-button"),
    navbarCollapseArea = <HTMLElement>d.getElementById("collapse-trigger-area"),

    timezoneClock = <HTMLElement>d.getElementById("clock-timezone"),
    timezoneOpt: Intl.DateTimeFormatOptions = {
      timeZone: timezoneClock.getAttribute("data-timezone") ?? "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

  function updateTimezoneClock() {
    timezoneClock.textContent = new Intl.DateTimeFormat([], timezoneOpt).format(new Date());
  }

  setInterval(updateTimezoneClock, 1e3);

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