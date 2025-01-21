export function initScroll(d: Document) {
  const header: HTMLElement = d.querySelector("body > header") as HTMLElement;

  let scrollPosition: number = 0;

  function scrollEv(): void {
    scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;
    header.classList.toggle("active", scrollPosition > 30.0);
  }

  scrollEv();

  window.addEventListener("scroll", scrollEv);
};