import packageJSON from "../build/out/attribution.json" with { type: "json" };
import initIcon from "../build/icons/footer";

function getLastUpdatedHrs(date: Date): string {
  const hours: number = Math.floor((now - date.getTime()) / 36e5);

  return hours <= 0 ? "<1 hour ago" : `${hours} hours ago`;
}

function getFutureUpdatedHrs(date: Date): string {
  const hours: number = Math.floor((date.getTime() - now) / 36e5);

  return hours <= 0 ? "in <1 hour" : `in ${hours} hours`;
}

function getLastUpdatedDays(date: Date): string {
  const
    ms: number = now - date.getTime()
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

, now: number = Date.now()

, lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label") as HTMLElement
, lastUpdateDate: Date = new Date(lastUpdateLabel.getAttribute("title") as string)

, lastPublishLabel: HTMLElement = d.getElementById("last-published-label") as HTMLElement
, lastPublishDate: Date = new Date(lastPublishLabel.getAttribute("title") as string)

, nextUpdateLabel: HTMLElement = d.getElementById("next-update-label") as HTMLElement
, nextUpdateDate: Date = new Date(nextUpdateLabel.getAttribute("title") as string)

, pkgAttrElCont: HTMLElement = d.querySelector("footer>.packages") as HTMLElement
// , pkgAttrEl: HTMLElement = pkgAttrElCont.querySelector(".inner") as HTMLElement

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

requestAnimationFrame((): void => {
  pkgAttrElCont.innerHTML = pkgAttrHTMLStr;

  lastUpdateLabel.textContent = getLastUpdatedHrs(lastUpdateDate);
  lastPublishLabel.textContent = getLastUpdatedDays(lastPublishDate);
  nextUpdateLabel.textContent = getFutureUpdatedHrs(nextUpdateDate);
});

// function updatePkgElSize(): void {
//   pkgAttrEl.style.setProperty("--width", `-${(pkgAttrEl.scrollWidth - pkgAttrElCont.clientWidth)}px`);
// }

// updatePkgElSize();

// new ResizeObserver(updatePkgElSize).observe(pkgAttrElCont);

// function updateClock(): void {
//   lastUpdateLabel.textContent = getLastUpdatedHrs(lastUpdateDate);
//   lastPublishLabel.textContent = getLastUpdatedDays(lastPublishDate);
//   nextUpdateLabel.textContent = getFutureUpdatedHrs(nextUpdateDate);
// }

// updateClock();
// setInterval(updateClock, 1e6);

// window.observe((entry: IntersectionObserverEntry): void => {
//   pkgAttrEl.style.animationPlayState = entry.isIntersecting ? "running" : "paused" ;
// })(pkgAttrElCont);
