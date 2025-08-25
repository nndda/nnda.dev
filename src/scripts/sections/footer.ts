import packageJSON from "../build/out/attribution.json" with { type: "json" };
import initIcon from "../build/icons/footer";

function getLastUpdatedHrs(date: Date): string {
  const hours: number = Math.floor((Date.now() - date.getTime()) / 36e5);

  return hours <= 0 ? "<1 hour ago" : `${hours} hours ago`;
}

function getFutureUpdatedHrs(date: Date): string {
  const hours: number = Math.floor((date.getTime() - Date.now()) / 36e5);

  return hours <= 0 ? "in <1 hour" : `in ${hours} hours`;
}

function getLastUpdatedDays(date: Date): string {
  const
    ms: number = Date.now() - date.getTime()
  , days: number = Math.floor(ms / 864e5)
  , hours: number = Math.floor((ms % 864e5) / 36e5)
  ;

  return days <= 0
    ? (hours <= 0 ? "<1 hour ago" : `${hours} hours ago`)
    : `${days} days, ${hours} hours ago`;
}

initIcon();

const
  d: Document = document

, lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label") as HTMLElement
, lastUpdateDate: Date = new Date(lastUpdateLabel.getAttribute("title") as string)

, lastPublishLabel: HTMLElement = d.getElementById("last-published-label") as HTMLElement
, lastPublishDate: Date = new Date(lastPublishLabel.getAttribute("title") as string)

, nextUpdateLabel: HTMLElement = d.getElementById("next-update-label") as HTMLElement
, nextUpdateDate: Date = new Date(nextUpdateLabel.getAttribute("title") as string)

, pkgAttrElCont: HTMLElement = d.querySelector("footer>.packages") as HTMLElement
, pkgAttrEl: HTMLElement = pkgAttrElCont.querySelector(".inner") as HTMLElement

, pkgAttrHTMLStr: string = (packageJSON as string[]).map((pkg: string) => {
    const
      pkgName: string = pkg.slice(0, -5)
    , pkgId: string = pkg.slice(-5)
    ;

    let
      pkgUrl: string = ""
    ;

    if (pkgId.startsWith("pkg")) {
      pkgUrl = `www.npmjs.com/package/${pkgName}`;
    } else if (pkgId === "pythn") {
      pkgUrl = `pypi.org/project/${pkgName}`;
    } else if (pkgId === "   gh") {
      pkgUrl = `github.com/${pkgName}`;
    } else {
      pkgUrl = pkgName;
    }

    return `<a href="https://${pkgUrl}" target="_blank" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer" class="${pkgId}"> ${pkgName} </a>`;
  }).join("")
;

requestAnimationFrame(() => {
  pkgAttrEl.innerHTML = pkgAttrHTMLStr;
});

function updatePkgElSize(): void {
  pkgAttrEl.style.setProperty("--width", `${(pkgAttrEl.scrollWidth - pkgAttrElCont.clientWidth) * -1}px`);
}

updatePkgElSize();

new ResizeObserver(updatePkgElSize).observe(pkgAttrElCont);

function updateClock(): void {
  lastUpdateLabel.textContent = getLastUpdatedHrs(lastUpdateDate);
  lastPublishLabel.textContent = getLastUpdatedDays(lastPublishDate);
  nextUpdateLabel.textContent = getFutureUpdatedHrs(nextUpdateDate);
}

updateClock();
setInterval(updateClock, 1e6);
