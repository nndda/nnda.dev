export function initScroll(d: Document) {
  const
    header: HTMLElement = d.querySelector("body > header") as HTMLElement
  , backTop: HTMLButtonElement = d.getElementById("back-top") as HTMLButtonElement
  ;

  let scrollPosition: number = 0;

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function scrollEv(): void {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;
    header.classList.toggle("active", scrollPosition > 30.0);
    backTop.classList.toggle("active", scrollPosition > 30.0);
  }

  scrollEv();

  window.addEventListener("scroll", scrollEv);
};