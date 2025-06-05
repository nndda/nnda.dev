export default function (d: Document): void {

  if ((d.defaultView as Window).matchMedia("(prefers-reduced-motion: no-preference)").matches) {

    const
      observer: (target: Element) => void = window.observe(
        (
          entry: IntersectionObserverEntry,
          observerObj: IntersectionObserver,
        ): void => {
          entry.target.classList.toggle("on", entry.isIntersecting);

          if (entry.isIntersecting && entry.target.classList.contains("once")) {
            observerObj.unobserve(entry.target);
          }
        },
      )
    ;

    const animEls: NodeListOf<HTMLElement> = d.querySelectorAll(".anim:not(.on)");
    for (let i: number = animEls.length; i-- > 0;) {
      observer(animEls[i]);
    }
  }
}