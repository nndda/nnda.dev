import initIcon from "../build/icons/profile";
initIcon();

const
  timezoneClock: HTMLElement = document.getElementById("clock-timezone") as HTMLElement
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

window.initAnim(
  document.getElementById("profile") as HTMLElement,
  "-210px 0px",
);
