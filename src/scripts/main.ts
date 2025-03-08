import { initializeInputs } from "./input";
import { initializeAnimations } from "./animations";

// const
//   msHr: number = 1e3 * 60 * 60, // 3600000
//   msDay: number = msHr * 24; // 86400000

function getLastUpdatedHrs(date: Date): string {
  const hours: number = Math.floor((Date.now() - date.getTime()) / 36e5);

  return hours <= 0 ? "less than an hour ago" : `${hours} hours ago`;
};

function getLastUpdatedDays(date: Date): string {
  const
    ms: number = Date.now() - date.getTime()
  , days: number = Math.floor(ms / 864e5)
  , hours: number = Math.floor((ms % 864e5) / 36e5)
  ;

  return days <= 0
    ? (hours <= 0 ? "less than an hour ago" : `${hours} hours ago`)
    : `${days} days, ${hours} hours ago`;
};

export function init(d: Document): void {
  initializeAnimations(d);

  const
    navbarMobile: HTMLElement = d.getElementById("navbar-mobile") as HTMLElement
  , navbarButton: HTMLElement = d.getElementById("navbar-button") as HTMLButtonElement
  , navbarCollapseArea: HTMLElement = d.getElementById("collapse-trigger-area") as HTMLElement

  , lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label") as HTMLElement
  , lastUpdateDate: Date = new Date(lastUpdateLabel.getAttribute("title") as string)

  , lastPublishLabel: HTMLElement = d.getElementById("last-published-label") as HTMLElement
  , lastPublishDate: Date = new Date(lastPublishLabel.getAttribute("title") as string)
  ;

  function updateClock(): void {
    lastUpdateLabel.textContent = getLastUpdatedHrs(lastUpdateDate);
    lastPublishLabel.textContent = getLastUpdatedDays(lastPublishDate);
  }

  updateClock();
  setInterval(updateClock, 5e5);

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
}
