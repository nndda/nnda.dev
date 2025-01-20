const d = document;

import { initializeScroll } from "./scroll";
import { initializeInputs } from "./input";
import { initializeAnimations } from "./animations";

let now: Date = new Date();

const
  msHr: number = 1e3 * 60 * 60,
  msDay: number = msHr * 24;

function getLastUpdated(date: Date): string {
  const hours: number = Math.floor(((now.getTime() - date.getTime()) % msDay) / msHr);

  return hours <= 0 ? "less than an hour ago" : `${hours} hours ago`;
};

d.addEventListener("DOMContentLoaded", () => {
  initializeAnimations(d);
  initializeScroll(d);

  const
    navbarMobile: HTMLElement = d.getElementById("navbar-mobile") as HTMLElement,
    navbarButton: HTMLElement = d.getElementById("navbar-button") as HTMLButtonElement,
    navbarCollapseArea: HTMLElement = d.getElementById("collapse-trigger-area") as HTMLElement,

    timezoneClock: HTMLElement = d.getElementById("clock-timezone") as HTMLElement,
    timezoneOpt: Intl.DateTimeFormatOptions = {
      timeZone: timezoneClock.getAttribute("data-timezone") ?? "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    },

    lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label") as HTMLElement,
    lastUpdateDate: Date = new Date(lastUpdateLabel.getAttribute("title") as string);

  function updateTimezoneClock(): void {
    now = new Date();

    timezoneClock.textContent = new Intl.DateTimeFormat([], timezoneOpt).format(now);
    lastUpdateLabel.textContent = getLastUpdated(lastUpdateDate);
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