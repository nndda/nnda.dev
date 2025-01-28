import "../build/icons/profile";

const
  timezoneClock: HTMLElement = document.getElementById("clock-timezone") as HTMLElement,
  timezoneOpt: Intl.DateTimeFormatOptions = {
    timeZone: timezoneClock.getAttribute("data-timezone") ?? "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

function updateClock(): void {
  timezoneClock.textContent = new Intl.DateTimeFormat([], timezoneOpt).format(new Date());
}

setInterval(updateClock, 1e3);
