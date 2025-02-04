import { initializeInputs } from "./input";
import { initializeAnimations } from "./animations";

// const
//   msHr: number = 1e3 * 60 * 60, // 3600000
//   msDay: number = msHr * 24; // 86400000

function getLastUpdated(date: Date): string {
  const hours: number = Math.floor(((new Date().getTime() - date.getTime()) % 864e5) / 36e5);

  return hours <= 0 ? "less than an hour ago" : `${hours} hours ago`;
};

export function init(d: Document): void {
  initializeAnimations(d);

  const
    navbarMobile: HTMLElement = d.getElementById("navbar-mobile") as HTMLElement,
    navbarButton: HTMLElement = d.getElementById("navbar-button") as HTMLButtonElement,
    navbarCollapseArea: HTMLElement = d.getElementById("collapse-trigger-area") as HTMLElement,

    lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label") as HTMLElement,
    lastUpdateDate: Date = new Date(lastUpdateLabel.getAttribute("title") as string);

  function updateClock(): void {
    lastUpdateLabel.textContent = getLastUpdated(lastUpdateDate);
  }

  updateClock();
  setInterval(updateClock, 3e5);

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
