export {};

declare global {
  interface Window { // eslint-disable-line
    p: (
      selector: string,
      iconSets: Record<string, string[]>,
    ) => void,

    observe: (
      intersectionCb: (
        entry: IntersectionObserverEntry,
        observerObj: IntersectionObserver,
      ) => void,
      rootMargin?: string,
    ) => (target: Element) => void,

    importLazy: (
      imports: (() => Promise<any>)[],
      element: Element,
      rootMargin?: string,
    ) => void,

    initAnim: (
      el: Element,
      rootMargin?: string,
      cb?: (() => void) | null,
    ) => void;

    loadCSS: (url: string) => Promise<void>,

    buildSvg: (
      viewBoxPath: string[],
      width: number,
      height: number,
      classes?: string
    ) => string,
  }
}
