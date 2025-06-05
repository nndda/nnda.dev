import contribsGrid from "../../api/contribs-yearly.json" with { type: "json" };

import "../build/icons/overview";

export default function (d: Document) {
  (d.querySelector(".calendar-container .grid") as HTMLElement).innerHTML = 
    contribsGrid.map((val: number): string => {
      return `<i class="c${val}"></i>`;
    }).join("")
  ;
}