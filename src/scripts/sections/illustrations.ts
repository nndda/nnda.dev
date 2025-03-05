const
  elements: NodeListOf<HTMLElement> = document.querySelectorAll("#illustrations .img > *")
, easedRatios: Map<HTMLElement, number> = new Map()
, targetRatios: Map<HTMLElement, number> = new Map()
, scrollOffset: number = .8
, scrollOffsetV: number = (1 - scrollOffset) * .5
;
let ticking: boolean = false;

function clamp(num: number, min: number, max: number): number {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

function updateIllustHeight(): void {
  elements.forEach(el => {
    // const
    //   height: number = parseInt(el.getAttribute("data-height") || "")
    // , width: number = parseInt(el.getAttribute("data-width") || "")
    // ;

    // el.style.height = `${height}px`;
    // el.style.width = `${width}px`;

    (el.parentElement as HTMLElement).style.height = `${el.clientHeight * scrollOffset}px`;
    el.style.top = `-${el.clientHeight * scrollOffsetV}px`;
  });
}

updateIllustHeight();

function updateIllustScroll(): void {
  elements.forEach(el => {
    let easedRatio: number = easedRatios.get(el) ?? 0;

    easedRatio += ((targetRatios.get(el) ?? 0) - easedRatio) * 0.1;
    easedRatios.set(el, clamp(easedRatio, -1, 1));
    el.style.transform = `translateY(${clamp(easedRatio, -1, 1) * (el.clientHeight * scrollOffsetV)}px)`;
  });

  if ([...targetRatios.keys()].some(el => Math.abs((easedRatios.get(el) ?? 0) - (targetRatios.get(el) ?? 0)) > 0.001)) {
    requestAnimationFrame(updateIllustScroll);
  } else {
    ticking = false;
  }
}

updateIllustScroll();

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const rect: DOMRect = el.getBoundingClientRect();

    targetRatios.set(el, 1 - ((rect.top + rect.height * .5) / window.innerHeight) * 2);
  });

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateIllustScroll);
  }
});

// TODO: optimize this
window.addEventListener("resize", () => {
  updateIllustHeight();
});
