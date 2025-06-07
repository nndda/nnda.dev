import contribsGrid from "../../api/contribs-yearly.json" with { type: "json" };
import initIcon from "../build/icons/overview";

const contribsGridElRaw: string = contribsGrid.map((val: number): string => {
  return `<i class="c${val}"></i>`;
}).join("");

export default function (d: Document): void {
  const
    contribsGridEl: HTMLElement = d.querySelector(".calendar-container .grid") as HTMLElement
  ;

  window.initAnim(
    d.querySelector("#overview .commits") as HTMLElement,
    "-120px 0px",
  );

  initIcon();

  window.initAnim(
    d.querySelector("#overview .languages") as HTMLElement,
    "-120px 0px",
  );

  window.initAnim(
    d.querySelector("#overview .stacks") as HTMLElement,
    "-120px 0px",
  );

  contribsGridEl.classList.remove("on");

  setTimeout((): void => {
    contribsGridEl.classList.remove("has-loader");

    requestAnimationFrame((): void => {
      contribsGridEl.innerHTML = contribsGridElRaw;
      contribsGridEl.classList.add("on");
    });
  }, 500);
}
