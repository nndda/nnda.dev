import { buildSvg } from "../framework";

import icons from "../build/icons/overview";
import stacksData, { type StacksData } from "../../data/site-stacks";

type OverviewStats = typeof import("../../public/overview-stats.json");

fetch("/overview-stats.json")
  .then((res: Response): Promise<OverviewStats> => res.json())
  .then((data: OverviewStats) => {

    interface LangsData {
      [lang: string]: number[],
    }

    const
      overviewEl: HTMLElement = document.getElementById("overview")!

    , contribsGridEl: HTMLElement = overviewEl.querySelector(".calendar-container .grid")!
    , contribsGridHTML: string =
      `<div class="date">` + data.contribs["first"] + "</div>" +
        data.contribs["arr"].map((val: number): string => {
          return `<i class="c${val}"></i>`;
        }).join("") +
      `<div class="date">` + data.contribs["last"] + "</div>"

    , langsEl: HTMLElement = overviewEl.querySelector(".languages-container")!
    , langsHTML: string = Object.entries(data.langs as LangsData).map(
        (
          lang: [string, number[]], i: number,
        ): string => {
          return ((i == 2) ? `<div class="flex-br"></div>` : "") + `
            <div class="lang anim once" style="width: ${lang[1][1]}%">
              <div class="box">
                <code><b>${lang[1][0]}%</b></code>
              </div>
              <div class="icon-text">
                ${lang[0] in icons ? buildSvg(icons[(lang[0] as keyof typeof icons)], 17, 17) : ""}
                <span>
                  ${lang[0]}
                </span>
              </div>
            </div>
          `;
      }).join("")

    , stacksEl: HTMLElement = overviewEl.querySelector(".stacks-lists>ul")!
    , stacksHTML: string = stacksData.map(
        (
          data: StacksData | "mobile-br"
        ): string => {
          return data == "mobile-br" ? `<li class="mobile-br"></li>` : `
            <li class="anim fade float-up">
              <ul class="nostyle">
                ${
                  data.items.map((item: string): string => {
                    return `
                      <li class="icon anim fade float-right">
                        ${buildSvg(icons[(item as keyof typeof icons)], 29, 29)}
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
    contribsGridEl.classList.remove("on");

    setTimeout(() => {
      contribsGridEl.classList.remove("has-loader");

      requestAnimationFrame(() => {

        // Commits heatmap
        contribsGridEl.innerHTML = contribsGridHTML;
        // contribsGridEl.classList.add("on");

        // Language stats
        langsEl.innerHTML = langsHTML;

        // Tech stacks showcase
        stacksEl.innerHTML = stacksHTML;

        requestAnimationFrame(() => {
          for (const animEl of overviewEl.querySelector(".commits")!.querySelectorAll(".anim:not(.on)")) {
            animEl.classList.add("on");
          }
        });
      });
    }, 560);

  })
;

// import socials from "./overview.socials";
// socials();
