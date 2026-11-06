import scroll from "./scroll";

export default function (d: Document) {
  scroll(d);

  const
    illustContStyle = (d.querySelector(".illust-cont > img") as HTMLElement).style
  ;

  let
    scrollPosition = 0
  , scrollRatio = 0
  , ticking = false
  ;

  function scrollTransform() {
    scrollRatio = scrollPosition / window.innerHeight;

    if (scrollRatio <= 1) {
      illustContStyle.translate = `0 -${scrollRatio * 250}px`;
    }

    ticking = false;
  }


  function scrollEv() {
    if (!ticking) {
      scrollPosition = window.scrollY;
      ticking = true;

      requestAnimationFrame(scrollTransform);
    }
  }

  scrollEv();

  window.addEventListener("scroll", scrollEv, { passive: true });
}
