export function initializeAnimations(d: Document): void {
  const intersectionObserverOptions: Readonly<IntersectionObserverInit> = Object.freeze({
    root: null,
    threshold: 0,
  });

  if ((d.defaultView as Window).matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const
      observerScrollAnim = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
          for (let i: number = entries.length; i-- > 0;) {
            const entry: IntersectionObserverEntry = entries[i];
            entry.target.classList.toggle("on", entry.isIntersecting);

            if (entry.isIntersecting && entry.target.classList.contains("once")) {
              observerScrollAnim.unobserve(entry.target);
            }
          }
        },
        intersectionObserverOptions,
      )
    , observer = observerScrollAnim.observe.bind(observerScrollAnim)
    ;

    const animEls: NodeListOf<HTMLElement> = d.querySelectorAll(".anim");
    for (let i: number = animEls.length; i-- > 0;) {
      observer(animEls[i]);
    }

    // d.querySelectorAll(".anim").forEach(observer);
  }
}