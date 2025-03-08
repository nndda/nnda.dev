export function initScroll(d: Document) {
  const
    headerClasses: DOMTokenList = (d.querySelector("body > header") as HTMLElement).classList
  , backTop: HTMLButtonElement = d.getElementById("back-top") as HTMLButtonElement
  , documentWindow: Window = document.defaultView as Window
  ;

  let
    scrollPosition: number = 0
  , toggleHeader: boolean = false
  ;

  backTop.addEventListener("click", () => {
    documentWindow.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function scrollEv(): void {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;
    toggleHeader = scrollPosition > 30.0;

    headerClasses.toggle("active", toggleHeader);
    backTop.classList.toggle("active", toggleHeader);
  }

  scrollEv();

  documentWindow.addEventListener("scroll", scrollEv, { passive: true });
};