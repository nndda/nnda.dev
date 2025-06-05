interface Window { // eslint-disable-line
  p: (
    selector: string,
    iconSets: Record<string, string>,
  ) => void,

  observe: (
    intersectionCb: (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ) => void,
    initThreshold?: number | number[] | undefined,
  ) => (target: Element) => void,
}

// Load and populate lazy-loaded icons
window.p = function (selector: string, iconSets: Record<string, string>): void {
  requestAnimationFrame(() => {
    document.querySelectorAll(selector).forEach((el: Element) => {
      el.outerHTML = iconSets[
        (el.getAttribute("data-i") as string)
        .replace(
          "<svg",
          `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"`
        )
      ];
    });
  });
};

// Helper function to create intersection observer
window.observe = function (
    intersectionCb: (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ) => void,
    initThreshold: number | number[] | undefined = undefined
) {
  const
    observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        for (let i: number = entries.length; i-- > 0;) {
          intersectionCb(entries[i], observer);
        }
      },
      {
        root: null,
        threshold: initThreshold,
      },
    )
  ;

  return observer.observe.bind(observer);
}