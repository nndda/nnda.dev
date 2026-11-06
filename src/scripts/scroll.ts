import { observe } from "./runtime";

export default function (d: Document) {
  const
    headerClasses = d.querySelector("body > header")!.classList
  , backTop = d.getElementById("back-top") as HTMLButtonElement
  , headerCollapseEl = d.querySelector(".header-collapse")!
  ;

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  observe(entry => {

    const active = entry.intersectionRatio <= 0;

    headerClasses.toggle("active", active);
    backTop.classList.toggle("active", active);

  })(headerCollapseEl);
};
