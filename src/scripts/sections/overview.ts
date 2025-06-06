import contribsGrid from "../../api/contribs-yearly.json" with { type: "json" };
import initIcon from "../build/icons/overview";

const contribsGridElRaw: string = contribsGrid.map((val: number): string => {
  return `<i class="c${val}"></i>`;
}).join("");

export default function (d: Document): void {
  const
    contribsGridEl: HTMLElement = d.querySelector(".calendar-container .grid") as HTMLElement

  , sectLang: HTMLElement = d.querySelector("#overview .languages") as HTMLElement
  , sectStack: HTMLElement = d.querySelector("#overview .stacks") as HTMLElement
  ;


  initIcon();

  window.observe((entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      for (const animEl of sectLang.querySelectorAll(".anim.man")) {
        animEl.classList.add("on");
      }
    }
  }, "-120px 0px" )(sectLang);

  window.observe((entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      for (const animEl of sectStack.querySelectorAll(".anim.man")) {
        animEl.classList.add("on");
      }
    }
  }, "-120px 0px" )(sectStack);


  contribsGridEl.classList.remove("on");

  setTimeout((): void => {
    contribsGridEl.classList.remove("has-loader");

    requestAnimationFrame((): void => {
      contribsGridEl.innerHTML = contribsGridElRaw;
    });

    contribsGridEl.classList.add("on");
  }, 500);
}
