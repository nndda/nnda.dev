export function initScroll(d: Document) {
  const
    headerClasses: DOMTokenList = (d.querySelector("body > header") as HTMLElement).classList
  , backTop: HTMLButtonElement = d.getElementById("back-top") as HTMLButtonElement
  , documentWindow: Window = document.defaultView as Window
  ;

  backTop.addEventListener("click", () => {
    documentWindow.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function toggleHeaderFn(toggle: boolean): void {
    requestAnimationFrame(() => {
      headerClasses.toggle("active", toggle);
      backTop.classList.toggle("active", toggle);
    });
  }

  function scrollEv(): void {
    toggleHeaderFn((d.documentElement.scrollTop || d.body.scrollTop) > 30.0);
  }

  scrollEv();

  documentWindow.addEventListener("scroll", scrollEv, { passive: true });
};