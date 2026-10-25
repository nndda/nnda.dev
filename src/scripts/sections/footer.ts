import { buildSvg, initIcons, observe } from "../framework";

import packageJSON from "../build/out/attribution.json" with { type: "json" };

import icons from "../build/icons/footer";
import iconsAttr from "../build/icons/footer.attributions";

function getLastUpdatedHrs(date: Date) {
  const hours = Math.floor((now - date.getTime()) / 36e5);

  return hours <= 0 ? "<1 hour ago" : `${hours} hour${hours === 1 ? "" : "s"} ago`;
}

function getFutureUpdatedHrs(date: Date) {
  const hours = Math.floor((date.getTime() - now) / 36e5);

  return hours <= 0 ? "in <1 hour" : `in ${hours} hour${hours === 1 ? "" : "s"}`;
}

function getLastUpdatedDays(date: Date) {
  const
    ms = now - date.getTime()
  , days = Math.floor(ms / 864e5)
  , hours = Math.floor((ms % 864e5) / 36e5)
  ;

  return days <= 0
    ? (hours <= 0 ? "<1 hour ago" : `${hours} hour${hours === 1 ? "" : "s"} ago`)
    : `${days} days, ${hours} hour${hours === 1 ? "" : "s"} ago`;
}

initIcons("footer", icons);

const
  d = document

, now = Date.now()

, lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label")!
, lastUpdateDate = new Date(lastUpdateLabel.getAttribute("title")!)

, lastPublishLabel: HTMLElement = d.getElementById("last-published-label")!
, lastPublishDate = new Date(lastPublishLabel.getAttribute("title")!)

, nextUpdateLabel: HTMLElement = d.getElementById("next-update-label")!
, nextUpdateDate = new Date(nextUpdateLabel.getAttribute("title")!)

, pkgAttrElCont: HTMLElement = d.querySelector("footer>.packages>.inner")!

, pkgAttrHTMLStr = packageJSON.map(pkg => {
    const
      pkgName = pkg.slice(0, -1)
    , pkgId = pkg.slice(-1)

    , hasIcon = pkgName in iconsAttr
    ;

    let
      pkgUrl: string
    ;

    if (pkgId == "1") {
      pkgUrl = `www.npmjs.com/package/` + pkgName;
    } else if (pkgId == "2") {
      pkgUrl = `pypi.org/project/` + pkgName;
    } else if (pkgId == "3") {
      pkgUrl = `github.com/` + pkgName;
    } else {
      pkgUrl = pkgName;
    }

    return `<a href="https://${pkgUrl}" target="_blank" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer" class="${pkgId} ${hasIcon ? "has-icon" : ""}">${
      (hasIcon) ? buildSvg(iconsAttr[(pkgName as keyof typeof iconsAttr)], 13, 13) : ""
    }${pkgName} </a>`;
  }).join("")
;

requestAnimationFrame(() => {
  pkgAttrElCont.innerHTML = pkgAttrHTMLStr;
  pkgAttrElCont.style.setProperty("--pkg-len", `calc(-${pkgAttrElCont.scrollWidth}px + 100%)`);

  observe(entry => {

    pkgAttrElCont.style.animationPlayState = entry.isIntersecting ? "running" : "paused";

  })(d.querySelector("body>footer")!);

  lastUpdateLabel.textContent = getLastUpdatedHrs(lastUpdateDate);
  lastPublishLabel.textContent = getLastUpdatedDays(lastPublishDate);
  nextUpdateLabel.textContent = getFutureUpdatedHrs(nextUpdateDate);
});
