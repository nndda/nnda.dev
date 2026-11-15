import { buildSvg, initIcons, observe } from "@runtime";

import attributionData from "../../scripts/build/out/attribution.json" with { type: "json" };

import icons from "../../scripts/build/icons/footer";
import iconsAttr from "../../scripts/build/icons/footer.attributions";

// function getLastUpdatedHrs(date: Date) {
//   const hours = Math.floor((now - date.getTime()) / 36e5);
//
//   return hours <= 0 ? "<1 hour ago" : `${hours} hour${hours === 1 ? "" : "s"} ago`;
// }
//
// function getFutureUpdatedHrs(date: Date) {
//   const hours = Math.floor((date.getTime() - now) / 36e5);
//
//   return hours <= 0 ? "in <1 hour" : `in ${hours} hour${hours === 1 ? "" : "s"}`;
// }

function getLastUpdatedDays(date: Date) {
  const
    ms = now - date.getTime()
  , days = Math.floor(ms / 864e5)
  , hours = Math.floor((ms % 864e5) / 36e5)
  , s = hours === 1 ? "" : "s"
  ;

  return (
    days <= 0
      ? (hours <= 0 ? "<1 hour" : `${hours} hour${s}`)
      : `${days} day${days === 1 ? "" : "s"}` + ( hours === 0 ? "" : `, ${hours} hour${s}`)
  ) + " ago";
}

initIcons("footer", icons);

let pkgAttrIdCurrent = 1;

const
  d = document

, cached = sessionStorage.getItem("nnda-dev-attributions")

, now = Date.now()

// , lastUpdateLabel: HTMLElement = d.getElementById("last-updated-label")!
// , lastUpdateDate = new Date(lastUpdateLabel.getAttribute("title")!)

, lastPublishLabel: HTMLElement = d.getElementById("last-published-label")!
, lastPublishDate = new Date(lastPublishLabel.getAttribute("title")!)

// , nextUpdateLabel: HTMLElement = d.getElementById("next-update-label")!
// , nextUpdateDate = new Date(nextUpdateLabel.getAttribute("title")!)

, pkgAttrElCont: HTMLElement = d.querySelector("footer>.packages>.inner")!

, pkgAttrHTMLStr = cached ? cached : attributionData
    .slice(attributionData[0] as unknown as number + 1)
    .map((pkg, id) => {
      if (id === attributionData[pkgAttrIdCurrent]) {
        pkgAttrIdCurrent++;
      }

      return `<a href="https://${
        (
            pkgAttrIdCurrent === 1
          ? `www.npmjs.com/package/`

          : pkgAttrIdCurrent === 2
          ? `pypi.org/project/`

          : pkgAttrIdCurrent === 3
          ? `github.com/`

          : ""
        ) + pkg
      }" target="_blank" rel="nofollow noopener noreferrer">${
        (pkg in iconsAttr) ? buildSvg(iconsAttr[(pkg as keyof typeof iconsAttr)], 13, 13) : ""
      }${pkg}</a>`;
      })
    .join("")
;


requestAnimationFrame(() => {
  pkgAttrElCont.innerHTML = pkgAttrHTMLStr;
  pkgAttrElCont.style.setProperty("--pkg-len", `calc(-${pkgAttrElCont.scrollWidth}px + 100%)`);

  const footerEl: HTMLElement = d.querySelector("body>footer")!;

  observe(entry => {

    footerEl.style.setProperty("--footer-anim-state", entry.isIntersecting ? "running" : "paused");

  })(footerEl);

  // lastUpdateLabel.textContent = getLastUpdatedHrs(lastUpdateDate);
  lastPublishLabel.textContent = getLastUpdatedDays(lastPublishDate);
  lastPublishLabel.title = lastPublishDate.toLocaleString();
  // nextUpdateLabel.textContent = getFutureUpdatedHrs(nextUpdateDate);

  sessionStorage.setItem("nnda-dev-attributions", pkgAttrHTMLStr);
});
