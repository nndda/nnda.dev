import contribsGrid from "../../api/contribs-yearly.json" with { type: "json" };
import icons from "../build/icons/overview";

import langsData from "../../api/out/langs.json" with { type: "json" };

interface LangsData {
  [lang: string]: number[],
}

import stacksData, { type StacksData } from "../../data/site-stacks";

const
  overviewEl: HTMLElement = document.getElementById("overview") as HTMLElement

, contribsGridElRaw: string = contribsGrid.map((val: number): string => {
    return `<i class="c${val}"></i>`;
  }).join("")

, contribsGridEl: HTMLElement = overviewEl.querySelector(".calendar-container .grid") as HTMLElement
;

window.initAnim(
  overviewEl.querySelector(".commits") as HTMLElement,
  "-120px 0px",
);


// Language stats
(overviewEl.querySelector(".languages-container") as HTMLElement).innerHTML = Object.entries(langsData as LangsData).map(
  (
//  lang: language, [percent, percent scaled]
    lang: [string, number[]]
  ): string => {
    return `
      <div class="lang anim once" style="width: ${lang[1][1]}%">
        <div class="box">
          <code><b>${lang[1][0]}%</b></code>
        </div>
        <div class="icon-text">
          ${lang[0] in icons ? window.buildSvg(icons[lang[0]], 17, 17) : ""}
          <span>
            ${lang[0]}
          </span>
        </div>
      </div>
    `;
}).join("");

window.initAnim(
  overviewEl.querySelector(".languages") as HTMLElement,
  "-120px 0px",
);


// Tech stacks showcase
(overviewEl.querySelector(".stacks-lists>ul") as HTMLElement).innerHTML = stacksData.map(
  (
    data: StacksData
  ): string => {
    return `
      <li class="anim fade float-up">
        <ul class="nostyle">
          ${
            data.items.map((item: string): string => {
              return `
                <li class="icon anim fade float-right">
                  ${window.buildSvg(icons[item], 29, 29)}
                </li>
              `;
            }).join("")
          }
        </ul>
        <div class="title anim fade float-down">${data.group}</div>
      </li>
    `;
}).join("");

window.initAnim(
  overviewEl.querySelector(".stacks") as HTMLElement,
  "-120px 0px",
);


// Fade in contribution graph
contribsGridEl.classList.remove("on");

setTimeout((): void => {
  contribsGridEl.classList.remove("has-loader");

  requestAnimationFrame((): void => {
    contribsGridEl.innerHTML = contribsGridElRaw;
    contribsGridEl.classList.add("on");
  });
}, 500);

export default {};
