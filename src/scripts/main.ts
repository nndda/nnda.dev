const d = document;

import { initializeScroll } from "./scroll";
import { initializeInputs } from "./input";

let now: Date = new Date();

const
  msHr = 1e3 * 60 * 60,
  msDay = msHr * 24;

function getLastUpdated(date: Date): string {
  const
    diff = now.getTime() - date.getTime(),
    days = Math.floor(diff / msDay),
    hours = Math.floor((diff % msDay) / msHr);

  let str = days > 0 ? `${days} days` : "";

  if (hours > 0) str += (str ? " " : "") + `${hours} hours`;

  return !str ? "less than an hour ago" : str + " ago";
};

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
    },

    lastUpdateLabel = <HTMLElement>d.getElementById("last-updated-label"),
    lastUpdateDate: Date = new Date(<string>lastUpdateLabel.getAttribute("title"));

  function updateTimezoneClock() {
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