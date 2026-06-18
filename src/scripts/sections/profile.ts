import { initAnim } from "../framework";

import initIcon from "../build/icons/profile";

initIcon();

const
  timezoneClock: HTMLElement = document.getElementById("clock-timezone")!
, timezoneOpt: Intl.DateTimeFormatOptions = {
    timeZone: timezoneClock.getAttribute("data-timezone") as string,
    hour12: false,
  }
;

function updateClock(): void {
  timezoneClock.textContent = new Date().toLocaleTimeString("en-US", timezoneOpt);
}

updateClock();
setInterval(updateClock, 1e3);

initAnim(
  document.getElementById("profile")!,
  window.matchMedia("media (width >= 700px) and (height >= 920px)").matches ? "-210px 0px" : "0px 0px",
);
