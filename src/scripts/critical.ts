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
    rootMargin?: string,
  ) => (target: Element) => void,

  importLazy: (
    d: Document,
    importFn: () => Promise<any>,
    element: Element,
    rootMargin?: string,
  ) => void,

  initAnim: (
    el: Element,
    rootMargin?: string,
    cb?: (() => void) | null,
  ) => void;
}

// Load and populate lazy-loaded icons
window.p = function (selector: string, iconSets: Record<string, string>): void {
  requestAnimationFrame((): void => {
    const iconEls: NodeListOf<Element> = document.querySelectorAll(selector);

    for (let i: number = iconEls.length; i-- > 0;) {
      iconEls[i].outerHTML = iconSets[
        (iconEls[i].getAttribute("data-i") as string)
        .replace(
          "<svg",
          `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"`
        )
      ];
    }
  });
};

// Helper function to create intersection observer
window.observe = function (
    intersectionCb: (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ) => void,
    rootMargin: string | undefined = undefined,
) {
  const
    observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        for (let i: number = entries.length; i-- > 0;) {
          intersectionCb(entries[i], observer);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: rootMargin,
      },
    )
  ;

  return observer.observe.bind(observer);
}

window.importLazy = function (
  d: Document,
  importFn: () => Promise<any>,
  element: Element,
  rootMargin: string | undefined = undefined,
): void {

  function importInit(): void {
    importFn()
      .then(({default: init}) => {
        init(d);
      })
      .catch(() => {
        importInit();
      });
  }

  window.observe(
    (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ): void => {
      if (entry.isIntersecting) {
        importInit();

        observerObj.disconnect();
      }
    }, rootMargin
  )(
    element
  );

}

window.initAnim = function (
  el: Element,
  rootMargin: string | undefined = undefined,
  cb: (() => void) | null = null,
): void {
  window.observe((entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      if (cb) cb();

      for (const animEl of el.querySelectorAll(".anim:not(.on)")) {
        animEl.classList.add("on");
      }
    }
  }, rootMargin )(el);
};
