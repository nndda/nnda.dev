export default function (d: Document) {

  import("./scroll")
    .then(({ default: scroll }) => {
      scroll(d);
    })
  ;

  const
    illustContStyle = (d.querySelector(".illust-cont > img") as HTMLElement).style
  ;

  let
   scrollRatio = 0
  , windowHeight = 0
  ;

  function scrollTransform() {
    illustContStyle.translate = `0 -${scrollRatio * 230}px`;
  }

  function resizeEv() {
    windowHeight = window.innerHeight;
  }

  function scrollEv() {
    scrollRatio = window.scrollY / windowHeight;

    if (scrollRatio <= 1) {
      requestAnimationFrame(scrollTransform);
    }
  }

  resizeEv();
  scrollEv();

  window.addEventListener("resize", resizeEv, { passive: true });
  window.addEventListener("scroll", scrollEv, { passive: true });
}
