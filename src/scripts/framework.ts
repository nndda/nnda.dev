const
  svgAttr = {
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
  const
    iconEls = document.querySelectorAll("svg." + selector + "[data-i]:not(.loaded)")
  ;

  requestAnimationFrame(() => {
    for (const iconEl of iconEls) {
      const
        [ viewBox, pathD ] = iconSets[iconEl.getAttribute("data-i")!]
      ;

      for (const attr in svgAttr) {
        iconEl.setAttribute(attr, svgAttr[attr]);
      }

      iconEl.setAttribute("viewBox", viewBox);
      iconEl.innerHTML = `<path fill="currentColor" d="` + pathD + `"></path>`;
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
    rootMargin?: string,
) {
  const
    observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
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
  // NOTE: a little questionable
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
  rootMargin?: string,
  cb?: () => void,
) {
  const
    animEls = element.querySelectorAll(".anim:not(.on)")
  ;

  function animCb(): void {
    for (const animEl of animEls) {
      animEl.classList.add("on");
    }
  }

  observe(
    (
      entry: IntersectionObserverEntry,
      observerObj: IntersectionObserver,
    ) => {
    if (entry.isIntersecting) {
      if (cb) cb();

      requestAnimationFrame(animCb);

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
  [ viewBox, pathD ]: string[],
  width: number,
  height: number,
  classes: string = "",
) {
  return `<svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" class="${classes}"><path d="${pathD}"></path></svg>`;
}
