import icons from "../build/icons/overview";
import stacksData, { type StacksData } from "../../data/site-stacks";

import("../../api/out/overview-stats.json").then((res): void => {

  interface LangsData {
    [lang: string]: number[],
  }

  const
    overviewEl: HTMLElement = document.getElementById("overview") as HTMLElement

  , contribsGrid = res.default["contribs"]

  , contribsGridEl: HTMLElement = overviewEl.querySelector(".calendar-container .grid") as HTMLElement
  , contribsGridHTML: string =
    `<div class="date">` + contribsGrid["first"] + "</div>" +
      contribsGrid["arr"].map((val: number): string => {
        return `<i class="c${val}"></i>`;
      }).join("") +
    `<div class="date">` + contribsGrid["last"] + "</div>"

  , langsEl: HTMLElement = overviewEl.querySelector(".languages-container") as HTMLElement
  , langsHTML: string = Object.entries(res.default.langs as LangsData).map(
      (
    //  lang: language, [percent, percent scaled]
        lang: [string, number[]], i: number,
      ): string => {
        return ((i == 2) ? `<div class="flex-br"></div>` : "") + `
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
    }).join("")

  , stacksEl: HTMLElement = overviewEl.querySelector(".stacks-lists>ul") as HTMLElement
  , stacksHTML: string = stacksData.map(
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
  ;

  // Fade in contribution graph
  // contribsGridEl.classList.remove("on");

  setTimeout((): void => {
    contribsGridEl.classList.remove("has-loader");

    requestAnimationFrame((): void => {

      // Commits heatmap
      contribsGridEl.innerHTML = contribsGridHTML;
      // contribsGridEl.classList.add("on");

      // Language stats
      langsEl.innerHTML = langsHTML;

      // Tech stacks showcase
      stacksEl.innerHTML = stacksHTML;

      requestAnimationFrame((): void => {
        for (const animEl of (overviewEl.querySelector(".commits") as HTMLElement).querySelectorAll(".anim:not(.on)")) {
          animEl.classList.add("on");
        }
      });

      // window.initAnim(
      //   overviewEl.querySelector(".commits") as HTMLElement,
      //   "-120px 0px",
      // );
    });
  }, 500);
});

import socials from "./overview.socials";
socials();

export default {};
