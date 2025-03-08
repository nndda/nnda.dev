const
  documentWindow: Window = document.defaultView as Window

, elements: NodeListOf<HTMLElement> = document.querySelectorAll("#illustrations .img > *")
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
    (el.parentElement as HTMLElement).style.height = `${el.clientHeight * scrollOffset}px`;
    el.style.top = `-${el.clientHeight * scrollOffsetV}px`;
  });
}

updateIllustHeight();

function updateEasedRatios(el: HTMLElement): void {
  let easedRatio: number = easedRatios.get(el) ?? 0;

  easedRatio += ((targetRatios.get(el) ?? 0) - easedRatio) * 0.1;
  easedRatios.set(el, clamp(easedRatio, -1, 1));
  el.style.transform = `translateY(${clamp(easedRatio, -1, 1) * (el.clientHeight * scrollOffsetV)}px)`;
}

function filterEasedRatios(el: HTMLElement): boolean {
  return Math.abs(
    (easedRatios.get(el) ?? 0) - (targetRatios.get(el) ?? 0)
  ) > 0.001
}

function updateIllustScroll(): void {
  elements.forEach(updateEasedRatios);

  if ([...targetRatios.keys()].some(filterEasedRatios)) {
    requestAnimationFrame(updateIllustScroll);
  } else {
    ticking = false;
  }
}

updateIllustScroll();

function updateTargetRatios(el: HTMLElement): void {
  const rect: DOMRect = el.getBoundingClientRect();

  targetRatios.set(el, 1 - ((rect.top + rect.height * .5) / documentWindow.innerHeight) * 2);
}

function scrollEv(): void {
  elements.forEach(updateTargetRatios);

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateIllustScroll);
  }
}

documentWindow.addEventListener("scroll", scrollEv, { passive: true });

// TODO: optimize this
documentWindow.addEventListener("resize", updateIllustHeight);
