const
  svgAttr: Record<string, string> = {
    "role": "img",
    "aria-hidden": "true",
    "focusable": "false",
    "xmlns": "http://www.w3.org/2000/svg",
  }
;


// Load and populate lazy-loaded icons
export function initIcons(
  selector: string,
  iconSets: Record<string, string[]>,
) {
  requestAnimationFrame(() => {
    for (const iconEl of document.querySelectorAll("svg." + selector + ":not(.loaded)")) {
      const
        iData = iconSets[iconEl.getAttribute("data-i") as string]
      ;

      for (const attr in svgAttr) {
        iconEl.setAttribute(attr, svgAttr[attr]);
      }

      iconEl.setAttribute("viewBox", iData[0]);
      iconEl.innerHTML = `<path fill="currentColor" d="` + iData[1] + `"></path>`;
      iconEl.classList.add("loaded");
    }
  });
};


// Helper function to create intersection observer
export function observe(
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


export function importLazy(
  imports: (() => Promise<any>)[],
  element: Element,
  rootMargin?: string,
) {

  let retry = 0;

  function importInit() {
    Promise.all(
      imports.map((val: () => Promise<any>): Promise<any> => val())
    )
    .catch(() => {
      if (retry < 5) {
        retry += 1;
        importInit();
      }
    });
  }

  observe(
    (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ) => {
      if (entry.isIntersecting) {
        importInit();

        observerObj.disconnect();
      }
    }, rootMargin
  )(
    element
  );
}


export function initAnim(
  element: Element,
  rootMargin: string | undefined = undefined,
  cb: (() => void) | null = null,
) {
  const
    animEls = element.querySelectorAll(".anim:not(.on)")
  ;

  observe(
    (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ) => {
    if (entry.isIntersecting) {
      if (cb) cb();

      requestAnimationFrame(() => {
        for (const animEl of animEls) {
          animEl.classList.add("on");
        }
      });

      observerObj.disconnect();
    }
  }, rootMargin )(
    element
  );
};


export function loadCSS(
  url: string,
): Promise<void> {
  return new Promise((
    resolve: () => void,
    reject: () => void,
  ) => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    document.head.appendChild(style);

    style.addEventListener("load", resolve);
    style.addEventListener("error", reject);
  });
}


export function buildSvg(
  viewBoxPath: string[],
  width: number,
  height: number,
  classes: string = "",
) {
  return `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxPath[0]}" width="${width}" height="${height}" class="${classes}"><path d="${viewBoxPath[1]}"></path></svg>`;
}
