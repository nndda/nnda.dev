import "../build/icons/profile";

const
  timezoneClock: HTMLElement = document.getElementById("clock-timezone") as HTMLElement
, timezoneOpt: Intl.DateTimeFormatOptions = {
    timeZone: timezoneClock.getAttribute("data-timezone") || "Asia/Jakarta",
    hour12: false,
  }
;

function updateClock(): void {
  timezoneClock.textContent = new Date().toLocaleTimeString("en-US", timezoneOpt);
}

updateClock();
setInterval(updateClock, 1e3);
