interface illustElementData {
  [elementIndex: number]: {
    topRel: number,
    height: number,
    intersecting: boolean,
  },
}

const
  d: Document = document
, documentWindow: Window = d.defaultView as Window

, elements: NodeListOf<HTMLElement> = d.querySelectorAll("#illustrations .img > *")

, illustData: illustElementData = { }

, scrollOffset: number = .75
, scrollOffsetV: number = (1 - scrollOffset) * .5
;

function clamp(num: number, min: number, max: number): number {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

requestAnimationFrame(() => {
  const
    intersectionObserverOptions: Readonly<IntersectionObserverInit> = Object.freeze({
      root: null,
      threshold: 0,
  });

  function initializeIllustElement(i: number): void {
    const rect: DOMRect = elements[i].getBoundingClientRect();

    illustData[i].height = rect.height;

    (elements[i].parentElement as HTMLElement).style.height = `${illustData[i].height * scrollOffset}px`;
    elements[i].style.top = `-${illustData[i].height * scrollOffsetV}px`;

    illustData[i].topRel = (rect.top + (illustData[i].height * .5)) + documentWindow.scrollY;
  }

  for (let i: number = elements.length; i-- > 0;) {
    illustData[i] = {
      topRel: 0,
      height: 0,
      intersecting: false,
    };

    initializeIllustElement(i);

    // TODO
    (elements[i] as HTMLImageElement).addEventListener("load", () => {

      initializeIllustElement(i);

    }, {

      once: true,
      passive: true,

    });

    new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        for (let k: number = entries.length; k-- > 0;) {
          illustData[i].intersecting = entries[k].isIntersecting;
        }
      },
      intersectionObserverOptions,
    ).observe(elements[i]);
  }

  documentWindow.addEventListener("resize", () => {
    for (let i: number = elements.length; i-- > 0;) {
      initializeIllustElement(i);
      scrollEv();
    }
  }, { passive: true });
});

function updateIllustScroll(): void {
  const
    docScrollY: number = documentWindow.scrollY
  , docInnerHeight: number = documentWindow.innerHeight
  ;

  for (let i: number = elements.length; i-- > 0;) {
    if (illustData[i].intersecting) {
      elements[i].style.transform = `translateY(${
        clamp(
          1 - ( 2 * (illustData[i].topRel - docScrollY) + illustData[i].height ) / docInnerHeight,
          -1, 1,
        )
          * 
        (
          illustData[i].height * scrollOffsetV
        )
      }px)`;
    }
  }
}

function scrollEv(): void {
  requestAnimationFrame(updateIllustScroll);
}

scrollEv();

documentWindow.addEventListener("scroll", scrollEv, { passive: true });
