import contribsGrid from "../../api/contribs-yearly.json" with { type: "json" };
import initIcon from "../build/icons/overview";

export default function (d: Document) {
  initIcon();

  (d.querySelector(".calendar-container .grid") as HTMLElement).innerHTML = 
    contribsGrid.map((val: number): string => {
      return `<i class="c${val}"></i>`;
    }).join("")
  ;
}